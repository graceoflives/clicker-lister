<template>
  <div class="lister-area">
    <textarea aria-label="Overall Information" class="overall" placeholder="Overall Information" rows="15"
      :value="textGeneralInfo" @focus="copyCommand"></textarea>
    <div class="logs">
      <div class="t-log-wrapper">
        <textarea aria-label="Transcension Log" class="t-log" placeholder="Transcension Log" rows="15"
          :value="transHistory" @focus="copyCommand"></textarea>
      </div>
      <div class="a-log-wrapper">
        <select v-model="selectedTrans" class="a-log-select" aria-label="Select transcension">
          <option value="">Select transcension to show ascensions</option>
          <option v-for="option in transSelectOptions" :key="option.value" :value="option.value">
            {{ option.text }}
          </option>
        </select>
        <textarea aria-label="Ascension Log" class="a-log" placeholder="Ascension Log" rows="14" :value="ascHistory"
          @focus="copyCommand"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import pad from 'lodash/pad';
import padStart from 'lodash/padStart';
import { Decimal } from 'decimal.js';
import { mapGetters } from 'vuex';

const DISPLAY_FUNCTION_MAP = {
  outsider: 'showOutsider',
  ancient: 'showAncient',
  gild: 'showGild',
  raid: 'showRaid',
  miscellaneous: 'showMiscellaneous',
  time: 'showTime',
  event: 'showEvent',
  relic: 'showRelic',
  totalRelicBonus: 'showTotalRelicBonus',
};

const HEROES = [
  { id: 1, name: 'Cid' },
  { id: 2, name: 'Treebeast' },
  { id: 3, name: 'Ivan' },
  { id: 4, name: 'Brittany' },
  { id: 5, name: 'Fisherman' },
  { id: 6, name: 'Betty' },
  { id: 7, name: 'Samurai' },
  { id: 8, name: 'Leon' },
  { id: 9, name: 'Seer' },
  { id: 10, name: 'Alexa' },
  { id: 11, name: 'Natalia' },
  { id: 12, name: 'Mercedes' },
  { id: 13, name: 'Bobby' },
  { id: 14, name: 'Broyle' },
  { id: 15, name: 'Sir George II' },
  { id: 16, name: 'Midas' },
  { id: 17, name: 'Referi Jerator' },
  { id: 18, name: 'Abaddon' },
  { id: 19, name: 'Ma Zhu' },
  { id: 20, name: 'Amenhotep' },
  { id: 21, name: 'Beastlord' },
  { id: 22, name: 'Athena' },
  { id: 23, name: 'Aphrodite' },
  { id: 24, name: 'Shinatobe' },
  { id: 25, name: 'Grant' },
  { id: 26, name: 'Frostleaf' },
  { id: 27, name: 'Dread Knight' },
  { id: 28, name: 'Atlas' },
  { id: 29, name: 'Terra' },
  { id: 30, name: 'Phthalo' },
  { id: 31, name: 'Banana' },
  { id: 32, name: 'Lilin' },
  { id: 33, name: 'Cadmia' },
  { id: 34, name: 'Alabaster' },
  { id: 35, name: 'Astraea' },
  { id: 36, name: 'Chiron' },
  { id: 37, name: 'Moloch' },
  { id: 38, name: 'Bomber Max' },
  { id: 39, name: 'Gog' },
  { id: 40, name: 'Wepwawet' },
  { id: 41, name: 'Tsuchi' },
  { id: 42, name: 'Skogur' },
  { id: 43, name: 'Moeru' },
  { id: 44, name: 'Zilar' },
  { id: 45, name: 'Madzi' },
  { id: 46, name: 'Xavira' },
  { id: 47, name: 'Cadu' },
  { id: 48, name: 'Ceus' },
  { id: 49, name: 'The Maw' },
  { id: 50, name: 'Yachiyl' },
  { id: 51, name: 'Ace Scout Rose' },
  { id: 52, name: 'Ace Scout Sophia' },
  { id: 53, name: 'Ace Scout Blanche' },
  { id: 54, name: 'Ace Scout Dorothy' },
];

const ANCIENTS = [
  {
    id: 4,
    name: 'Libertas',
    bonusType: 24,
  },
  {
    id: 5,
    name: 'Siyalatas',
    bonusType: 1,
  },
  {
    id: 8,
    name: 'Mammon',
    bonusType: 22,
  },
  {
    id: 9,
    name: 'Mimzee',
    bonusType: 21,
  },
  {
    id: 10,
    name: 'Pluto',
    bonusType: 20,
  },
  {
    id: 11,
    name: 'Dogcog',
    bonusType: 19,
  },
  {
    id: 12,
    name: 'Fortuna',
    bonusType: 18,
  },
  {
    id: 13,
    name: 'Atman',
    bonusType: 17,
  },
  {
    id: 14,
    name: 'Dora',
    bonusType: 16,
  },
  {
    id: 15,
    name: 'Bhaal',
    bonusType: 15,
  },
  {
    id: 16,
    name: 'Morgulis',
    bonusType: 14,
  },
  {
    id: 17,
    name: 'Chronos',
    bonusType: 3,
  },
  {
    id: 18,
    name: 'Bubos',
    bonusType: 13,
  },
  {
    id: 19,
    name: 'Fragsworth',
    bonusType: 2,
  },
  {
    id: 20,
    name: 'Vaagur',
    bonusType: 28,
  },
  {
    id: 21,
    name: 'Kumawakamaru',
    bonusType: 27,
  },
  {
    id: 22,
    name: 'Chawedo',
    bonusType: 4,
  },
  {
    id: 23,
    name: 'Hecatoncheir',
    bonusType: 12,
  },
  {
    id: 24,
    name: 'Berserker',
    bonusType: 11,
  },
  {
    id: 25,
    name: 'Sniperino',
    bonusType: 10,
  },
  {
    id: 26,
    name: 'Kleptos',
    bonusType: 9,
  },
  {
    id: 27,
    name: 'Energon',
    bonusType: 8,
  },
  {
    id: 28,
    name: 'Argaiv',
    bonusType: 7,
  },
  {
    id: 29,
    name: 'Juggernaut',
    bonusType: 26,
  },
  {
    id: 31,
    name: 'Revolc',
    bonusType: 5,
  },
  {
    id: 32,
    name: 'Nogardnit',
    bonusType: 999,
  },
];

const OUTSIDERS = [
  { id: 1, name: 'Xyliqil' },
  { id: 2, name: "Chor'gorloth" },
  { id: 3, name: 'Phandoryss' },
  { id: 5, name: 'Ponyboy' },
  { id: 6, name: 'Borb' },
  { id: 7, name: 'Rhageist' },
  { id: 8, name: "K'Ariqua" },
  { id: 9, name: 'Orphalas' },
  { id: 10, name: 'Sen-Akhan' },
];

export default {
  name: 'ListerArea',
  data: () => ({
    selectedTrans: '',
  }),
  watch: {
    transSelectOptions: function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.selectedTrans = '';
      }
    },
  },
  computed: {
    textGeneralInfo() {
      if (!isEmpty(this.rawData)) {
        const _r = [];
        this.generalDisplay.forEach((display) => {
          if (display.visible && DISPLAY_FUNCTION_MAP[display.name]) {
            _r.push(this[`${DISPLAY_FUNCTION_MAP[display.name]}`]());
          }
        });
        return _r.join('\n\n');
      }
      return '';
    },
    transHistory() {
      let tLog = get(this.rawData, 'stats.transcensions', []);
      if (!isEmpty(tLog)) {
        tLog = Object.entries(tLog).map(([, v]) => {
          const {
            endTime,
            heroSoulsGained,
            highestZoneEver,
            id,
            numAscensions,
            startTime,
          } = v;
          return [
            id.toString(),
            this.formatTime(new Date().getTime() + startTime - endTime),
            numAscensions.toString(),
            highestZoneEver.toString(),
            this.formatDecimal(new Decimal(heroSoulsGained)),
            Decimal.log10(heroSoulsGained)
              .times(5)
              .floor()
              .toString(),
          ];
        });
        const _label = ['No.', 'Duration', 'Ascensions', 'HZE', 'HS', 'AS'];
        const _lengthLog = [0, 1, 2, 3, 4, 5].map((i) =>
          Math.max(_label[i].length, ...tLog.map((v) => v[i].length))
        );
        const _tableHeader = `|${_label
          .map((v, i) => `${pad(v, _lengthLog[i], ' ')}`)
          .join('|')}|`;
        const _tableRows = tLog
          .map((v) => {
            v = v.map((s, i) => `${padStart(s, _lengthLog[i], ' ')}`).join('|');
            return `|${v}|`;
          })
          .join('\n');
        return `Transcension Log:\n\n${_tableHeader}\n${_tableRows}`;
      }
      return '';
    },
    transSelectOptions() {
      const tLog = get(this.rawData, 'stats.transcensions', []);
      if (!isEmpty(tLog)) {
        return Object.entries(tLog).map(([, v]) => {
          return {
            value: v.id,
            text: `No ${v.id}`,
          };
        });
      }
      return [];
    },
    ascHistory() {
      if (this.selectedTrans !== '') {
        let aLog = get(
          this.rawData,
          `stats.transcensions[${this.selectedTrans}].ascensions`,
          []
        );
        if (!isEmpty(aLog)) {
          aLog = Object.entries(aLog).map(([, v]) => {
            const {
              endTime,
              heroSoulsEnd,
              heroSoulsStart,
              highestZoneEver,
              id,
              startTime,
            } = v;
            return [
              id.toString(),
              this.formatTime(new Date().getTime() + startTime - endTime),
              highestZoneEver.toString(),
              this.formatDecimal(
                new Decimal(heroSoulsEnd).minus(heroSoulsStart)
              ),
            ];
          });
          const _label = ['No.', 'Duration', 'HZE', 'HS'];
          const _lengthLog = [0, 1, 2, 3].map((i) =>
            Math.max(_label[i].length, ...aLog.map((v) => v[i].length))
          );
          const _tableHeader = `|${_label
            .map((v, i) => `${pad(v, _lengthLog[i], ' ')}`)
            .join('|')}|`;
          const _tableRows = aLog
            .map((v) => {
              v = v
                .map((s, i) => `${padStart(s, _lengthLog[i], ' ')}`)
                .join('|');
              return `|${v}|`;
            })
            .join('\n');
          return `Ascensions in Transcension #${this.selectedTrans}\n\n${_tableHeader}\n${_tableRows}`;
        }
        return '';
      }
      return '';
    },
    ...mapGetters({
      generalDisplay: 'getDisplay',
      rawData: 'getRawData',
    }),
  },
  methods: {
    showOutsider() {
      const _data = get(this.rawData, 'outsiders.outsiders', []);
      if (!isEmpty(_data)) {
        const _info = OUTSIDERS.map(
          (outsider) =>
            `${outsider.name} (${_data[outsider.id] ? _data[outsider.id].level : '0'
            })`
        ).join(', ');
        return `**Outsiders:** ${_info}.`;
      }
      return '**Outsiders:** None.';
    },
    showAncient() {
      const _data = get(this.rawData, 'ancients.ancients', []);
      if (!isEmpty(_data)) {
        let _summoned = ANCIENTS.filter(({ id }) => {
          return id in _data;
        })
          .map((ancient) => ({
            name: ancient.name,
            level: new Decimal(_data[ancient.id].level),
          }))
          .sort((a, b) =>
            a.level.equals(b.level)
              ? a.name.localeCompare(b.name)
              : a.level.lt(b.level)
                ? 1
                : -1
          );
        const _notSummoned = ANCIENTS.filter(({ id }) => {
          return !(id in _data);
        });
        _summoned = _summoned
          .map(({ name, level }) => `${name} (${this.formatDecimal(level)})`)
          .join(', ');
        return `**Ancients:** ${_summoned}.${_notSummoned.length > 0
            ? `\n\nNot Summoned: ${_notSummoned.map((v) => v.name).join(', ')}.`
            : ''
          }`;
      }
      return '**Ancients:** None.';
    },
    showGild() {
      const _data = get(this.rawData, 'heroCollection.heroes', []);
      if (!isEmpty(_data)) {
        let noEpicLevel = true;
        const _info = HEROES.map((hero) => {
          const epicLevel = get(_data, `${hero.id}.epicLevel`, 0);
          if (epicLevel > 0) {
            noEpicLevel = false;
            return `${hero.name} (${epicLevel})`;
          }
          return '';
        })
          .filter((v) => v)
          .join(', ');
        return `**Gilds:** ${noEpicLevel ? 'None' : _info}.`;
      }
      return '**Gilds:** None.';
    },
    showRaid() {
      const {
        newClanRaidClassId,
        newClanRaidClassLevel,
        immortalSouls,
        pendingImmortalSouls,
      } = this.rawData;
      const raidName = ['', 'Rogue', 'Mage', 'Priest'][newClanRaidClassId];
      return `**Raids:** Class (${raidName}), Level (${newClanRaidClassLevel}), Immortal Souls (Current: ${immortalSouls}, Pending: ${pendingImmortalSouls}).`;
    },
    showMiscellaneous() {
      const {
        achievements,
        ancients: { ancients, rerollSoulsSpent },
        ancientSouls,
        ancientSoulsTotal,
        autoclickers,
        dlcAutoclickers,
        heroSouls,
        heroSoulsSacrificed,
        highestFinishedZone,
        highestFinishedZonePersist,
        numAscensionsThisTranscension,
        numWorldResets,
        numberOfTranscensions,
        paidForRubyMultiplier,
        relicsReceivedThisTranscension,
        rubies,
        titanDamage,
        totalRelicsReceived,
        transcendentHighestFinishedZone,
        pretranscendentHighestFinishedZone,
      } = this.rawData;
      const heroSoulsSpent = Object.entries(ancients).reduce(
        (a, [, { spentHeroSouls }]) => a.plus(spentHeroSouls),
        new Decimal(rerollSoulsSpent)
      );
      const allHeroSouls = heroSoulsSpent
        .plus(heroSouls)
        .plus(heroSoulsSacrificed);
      const asGain = allHeroSouls.gt(0)
        ? Decimal.log10(allHeroSouls)
          .times(5)
          .floor()
          .minus(ancientSoulsTotal)
        : new Decimal(0);
      const tp = new Decimal(ancientSoulsTotal)
        .times(-0.0003)
        .exp()
        .times(-23)
        .plus(25);
      const _info = [
        `AS (${ancientSoulsTotal}+${asGain.toString()}, ${ancientSouls > 0 ? `***Unspent: ${ancientSouls}***` : 'Unspent: 0'
        })`,
        `TP (${tp.toFixed(3)}%)`,
        `HS (${[
          this.formatDecimal(new Decimal(heroSouls)),
          `Spent: ${this.formatDecimal(heroSoulsSpent)}`,
          `Sacrificed: ${this.formatDecimal(new Decimal(heroSoulsSacrificed))}`,
        ].join(', ')})`,
        `Highest Zone (${[
          `This Ascension: ${highestFinishedZone}`,
          `This Transcension: ${highestFinishedZonePersist}`,
          `Ever: ${Math.max(
            transcendentHighestFinishedZone,
            pretranscendentHighestFinishedZone
          )}`,
        ].join(', ')})`,
        `Transcensions (${numberOfTranscensions})`,
        `Ascensions (This Transcension: ${numAscensionsThisTranscension}, Total: ${numWorldResets})`,
        `Relics Found (This Transcension: ${relicsReceivedThisTranscension}, Total: ${totalRelicsReceived})`,
        `Immortal Damage (${this.formatDecimal(new Decimal(titanDamage))})`,
        `Rubies (${rubies})`,
        `2x multiplier to all your dmg (${paidForRubyMultiplier ? 'Yes' : 'No'
        })`,
        `Auto Clickers (${autoclickers + dlcAutoclickers})`,
        `Achievements (${Object.entries(achievements).length}/167)`,
      ].join('; ');
      return `**Miscs:** ${_info}.`;
    },
    showTime() {
      const {
        creationTimestamp,
        startTimestamp,
        transcensionTimestamp,
      } = this.rawData;
      const _info = [
        `Since Start (${this.formatTime(creationTimestamp)})`,
        `Since Transcension (${this.formatTime(transcensionTimestamp)})`,
        `Since Ascension (${this.formatTime(startTimestamp)})`,
      ].join('; ');
      return `**Times:** ${_info}.`;
    },
    showEvent() {
      const {
        candyCanesEarned,
        clickmasRubiesEarned,
        openedClickmasPresents,
        unopenedClickmasPresents,
      } = this.rawData;
      const _info = [
        `Presents (Opened: ${openedClickmasPresents}, Unopened: ${unopenedClickmasPresents})`,
        `Rewards (Candy Canes: ${candyCanesEarned}, Rubies: ${clickmasRubiesEarned})`,
      ].join('; ');
      return `**Event:** ${_info}.`;
    },
    showRelic() {
      const {
        items: { slots, items },
      } = this.rawData;
      const active = Object.entries(slots)
        .filter((v) => parseInt(v[0]) < 5)
        .map((v) => v[1]);
      const _info = active
        .map((v) => {
          const relic = items[v];
          const relicBonus = [1, 2, 3, 4]
            .reduce((a, i) => {
              if (relic[`bonusType${i}`]) {
                const ancientName = ANCIENTS.filter(
                  (v) => v.bonusType === relic[`bonusType${i}`]
                )[0].name;
                const level = Number(relic[`bonus${i}Level`]).toFixed(2);
                a.push(`+${level} ${ancientName}`);
              }
              return a;
            }, [])
            .join(', ');
          return `* *${relic.name}*: ${relicBonus}`;
        })
        .join('\n');
      return `**Relics:**\n\n${_info}`;
    },
    showTotalRelicBonus() {
      const {
        items: { slots, items },
      } = this.rawData;
      const active = Object.entries(slots)
        .filter((v) => parseInt(v[0]) < 5)
        .map((v) => v[1]);
      const bonusByAncient = ANCIENTS.reduce((a, v) => {
        let level = 0;
        active.map((relicId) => {
          const relic = items[relicId];
          [1, 2, 3, 4].forEach((index) => {
            if (relic[`bonusType${index}`] === v.bonusType) {
              level += Number(relic[`bonus${index}Level`]);
            }
          });
        });
        if (level) {
          a.push(`* +${level.toFixed(2)} ${v.name}`);
        }
        return a;
      }, []).join('\n');
      return `**Total Relic Bonuses:**\n\n${bonusByAncient}`;
    },
    formatDecimal(d) {
      return d.lt(0)
        ? `-${this.formatDecimal(d.times(-1))}`
        : d.lt(10000)
          ? d.toFixed(0)
          : d.toExponential(4).replace('+', '');
    },
    formatTime(ts) {
      const cur = (new Date().getTime() - ts) / 1000;
      const day = (cur / 86400) | 0;
      const hour = ((cur - day * 86400) / 3600) | 0;
      const min = ((cur - day * 86400 - hour * 3600) / 60) | 0;
      return `${day ? `${day}d ` : ''}${hour ? `${hour}h ` : ''}${min}m`;
    },
    copyCommand(e) {
      e.target.select();
      document.execCommand('copy');
    },
  },
};
</script>

<style scoped lang="scss">
.lister-area {
  margin-top: 10px;

  textarea {
    border: 1px solid var(--color);
    border-radius: 4px;
    padding: 10px;
    background-color: var(--bg-color);
    font-size: 15px;
    color: var(--color);
    resize: vertical;
  }

  >.overall {
    display: block;
    width: calc(2/3) * 100%;
    margin: 0 auto;
    border: 1px solid var(--color);
    border-radius: 4px;
    padding: 10px;
    background-color: var(--bg-color);
    font-size: 15px;
    color: var(--color);
    resize: vertical;
  }

  >.logs {
    display: flex;
    align-items: stretch;
    justify-content: center;
    width: calc(2/3) * 100%;
    margin: 10px auto 0;

    >.t-log-wrapper {
      flex: 1;

      >.t-log {
        width: 100%;
        height: 100%;
      }
    }

    >.a-log-wrapper {
      flex: 1;
      margin-left: 10px;

      >.a-log-select {
        display: block;
        width: 100%;
        border: 1px solid var(--color);
        border-radius: 4px;
        padding: 10px;
        background-color: var(--bg-color);
        font-size: 15px;
        color: var(--color);
      }

      >.a-log {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
}

@media screen and (max-width: 992px) {
  .lister-area {
    padding: 10px 10px 0;

    >.overall {
      width: 100%;
    }

    >.logs {
      display: block;
      width: 100%;

      >.a-log-wrapper {
        margin: 10px 0 0;
      }
    }
  }
}
</style>
