import { create } from "zustand";
import { persist } from "zustand/middleware";
import merge from "lodash.merge";
interface SequencerStore {
  ticks: number;
  funds: number;
  reset: () => void;
  ticker: () => void;
  environment: {
    values: {
      pm2_5: number;
      pm10: number;
      temperature: number;
      sound: number;
      timestamp: string;
    };
    impact: {
      pm2_5: number;
      pm10: number;
      temperature: number;
      sound: number;
    };
    fetchNewReadings: () => void;
    calculateImpact: () => void;
    updateValues: (args: {
      pm2_5: number;
      pm10: number;
      temperature: number;
      sound: number;
      timestamp: string;
    }) => void;
  };
  sequences: {
    total: number;
    unsold: number;
    price: number;
    priceDiff: number;
    demand: number;
    raisePrice: () => void;
    lowerPrice: () => void;
    calculateDemand: () => void;
    createSequence: () => void;
    sellAvailableSequences: () => void;
  };
  bytes: {
    total: number;
    price: number;
    basePrice: number;
    perSequence: number;
    perOrder: number;
    buyBytes: () => void;
    updateBytesPrice: () => void;
  };
  autosequencer: {
    total: number;
    price: number;
    productivity: number;
    level: number;
    buyAutosequencer: () => void;
    generateAutomaticSequences: () => void;
  };
  autopurchaser: {
    price: number;
    active: boolean;
    purchased: boolean;
    purchaseAutopurchaser: () => void;
    toggleAutopurchaser: () => void;
  };
}

const useStore = create(
  persist<SequencerStore>(
    (set, get) => ({
      reset: () => {
        set((state) => ({
          ticks: 0,
          funds: 0,
          bytes: {
            ...state.bytes,
            total: 2048,
            price: 128,
            basePrice: 128,
            perSequence: 4,
            perOrder: 2048,
          },
          sequences: {
            ...state.sequences,
            total: 0,
            unsold: 0,
            price: 2.8,
            priceDiff: 0.2,
            demand: 0.4,
          },

          autosequencer: {
            ...state.autosequencer,
            productivity: 1,
            price: 128,
            level: 1,
            total: 0,
          },
          autopurchaser: {
            ...state.autopurchaser,
            active: false,
            purchased: false,
          },
        }));
      },
      ticks: 0,
      funds: 0,
      environment: {
        values: {
          pm10: 0,
          pm2_5: 0,
          temperature: 16,
          sound: 0,
          timestamp: new Date().toISOString(),
        },
        impact: {
          pm10: 0,
          pm2_5: 0,
          temperature: 0,
          sound: 0,
        },
        fetchNewReadings: async () => {
          const { environment } = get();
          const data = await fetch(import.meta.env.AQ_API_URL).then((r) =>
            r.json()
          );
          if (data) {
            environment.updateValues({
              pm2_5: data.pm2_5,
              pm10: data.pm10,
              sound: data.noise,
              temperature: data.temperature,
              timestamp: data.timestamp,
            });
          }
        },
        updateValues: (args) => {
          set((state) => ({
            environment: {
              ...state.environment,
              values: args,
            },
          }));

          const { environment } = get();
          environment.calculateImpact();
        },
        calculateImpact: () => {
          const {
            environment: {
              values: { pm10, pm2_5, temperature, sound },
            },
          } = get();

          const pm2_5Impact = 0.001 * Math.pow(pm2_5, 1.3);
          const pm10Impact = 0.001 * Math.pow(pm10, 1.3);
          const tempImpact =
            temperature < 16
              ? Math.pow(temperature - 16, 2) * 0.0001
              : temperature > 24
              ? Math.pow(temperature - 24, 2) * 0.0001
              : 0;
          const soundImpact = 0.01 * Math.pow(sound, 1.3);

          set((state) => ({
            environment: {
              ...state.environment,
              impact: {
                pm2_5: pm2_5Impact,
                pm10: pm10Impact,
                temperature: tempImpact,
                sound: soundImpact,
              },
            },
            autosequencer: {
              ...state.autosequencer,
              productivity:
                1 +
                (1 - tempImpact) / 4 -
                pm2_5Impact -
                soundImpact -
                pm10Impact,
            },
          }));
        },
      },
      sequences: {
        total: 0,
        unsold: 0,
        price: 2.8,
        priceDiff: 0.2,
        demand: 0.4,
        calculateDemand: () => {
          set((state) => {
            const { sound, pm10, pm2_5 } = state.environment.impact;

            const envScores = sound + pm10 + pm2_5;

            const demand =
              (0.7 / Math.pow(state.sequences.price, 1.3)) * (1.5 - envScores);

            return {
              sequences: {
                ...state.sequences,
                demand,
              },
            };
          });
        },
        raisePrice: () => {
          set((state) => ({
            sequences: {
              ...state.sequences,
              price: state.sequences.price + state.sequences.priceDiff,
            },
          }));
        },
        lowerPrice: () => {
          set((state) => ({
            sequences: {
              ...state.sequences,
              price:
                state.sequences.price - state.sequences.priceDiff >=
                state.sequences.priceDiff
                  ? state.sequences.price - state.sequences.priceDiff
                  : state.sequences.priceDiff,
            },
          }));
        },
        createSequence: () => {
          const { bytes } = get();
          if (bytes.total >= bytes.perSequence) {
            set((state) => ({
              sequences: {
                ...state.sequences,
                unsold: state.sequences.unsold + 1,
                total: state.sequences.total + 1,
              },
              bytes: {
                ...state.bytes,
                total: state.bytes.total - bytes.perSequence,
              },
            }));
          }
        },
        sellAvailableSequences: () => {
          const {
            sequences: { unsold, demand },
          } = get();

          if (Math.random() < demand) {
            const numberToSell = Math.floor(0.7 * Math.pow(demand * 10, 1.15));
            if (unsold < numberToSell) {
              set((state) => ({
                funds:
                  state.funds + state.sequences.price * state.sequences.unsold,
                sequences: {
                  ...state.sequences,
                  unsold: 0,
                },
              }));
            } else {
              set((state) => ({
                funds: state.funds + state.sequences.price * numberToSell,
                sequences: {
                  ...state.sequences,
                  unsold: state.sequences.unsold - numberToSell,
                },
              }));
            }
          }
        },
      },
      bytes: {
        total: 2048,
        price: 128,
        basePrice: 128,
        perSequence: 4,
        perOrder: 2048,
        updateBytesPrice: () => {
          const { environment } = get();
          set((state) => ({
            bytes: {
              ...state.bytes,
              price:
                state.bytes.basePrice +
                ((1 + Math.sin(state.ticks)) *
                  (environment.impact.sound + environment.impact.pm2_5) *
                  state.bytes.basePrice) /
                  4,
            },
          }));
        },
        buyBytes: () => {
          const { bytes, funds } = get();
          if (funds >= bytes.price) {
            set((state) => ({
              bytes: {
                ...state.bytes,
                total: state.bytes.total + state.bytes.perOrder,
              },
              funds: state.funds - state.bytes.price,
            }));
          }
        },
      },
      autosequencer: {
        total: 0,
        productivity: 1,
        price: 128,
        level: 1,
        generateAutomaticSequences: () => {
          const {
            bytes: { total: totalBytes, perSequence },

            autosequencer: { total: totalAutosequencers, productivity, level },
          } = get();

          if (productivity < 1 && Math.random() > productivity) return;

          const totalSequencesToMake = Math.floor(
            totalAutosequencers * (1 + level * 0.1)
          );

          if (totalBytes < perSequence * totalSequencesToMake) {
            const max = Math.floor(totalBytes / perSequence);
            set((state) => ({
              sequences: {
                ...state.sequences,
                unsold: state.sequences.unsold + max,
                total: state.sequences.total + max,
              },
              bytes: {
                ...state.bytes,
                total: state.bytes.total - max * perSequence,
              },
            }));
          } else {
            set((state) => ({
              sequences: {
                ...state.sequences,
                unsold: state.sequences.unsold + totalSequencesToMake,
                total: state.sequences.total + totalSequencesToMake,
              },
              bytes: {
                ...state.bytes,
                total: state.bytes.total - totalSequencesToMake * perSequence,
              },
            }));
          }
        },
        buyAutosequencer: () => {
          set((state) => ({
            funds: state.funds - state.autosequencer.price,
            autosequencer: {
              ...state.autosequencer,
              total: state.autosequencer.total + 1,
              price: state.autosequencer.price * 1.2,
            },
          }));
        },
      },
      ticker: () => {
        const { ticks, autosequencer, sequences, bytes, autopurchaser, funds } =
          get();

        if (
          autopurchaser.active &&
          bytes.total <= bytes.perSequence &&
          funds > bytes.price
        ) {
          bytes.buyBytes();
        }

        sequences.calculateDemand();
        autosequencer.generateAutomaticSequences();
        sequences.sellAvailableSequences();

        if (ticks % 10 === 0) {
          bytes.updateBytesPrice();
        }

        set((state) => ({
          ticks: state.ticks + 1,
        }));
      },
      autopurchaser: {
        active: false,
        purchased: false,
        price: 1024,
        purchaseAutopurchaser: () => {
          const { funds, autopurchaser } = get();
          if (funds >= autopurchaser.price) {
            set((state) => ({
              autopurchaser: {
                ...state.autopurchaser,
                purchased: true,
                active: !!state.autopurchaser.active,
              },
              funds: state.funds - state.autopurchaser.price,
            }));
          }
        },
        toggleAutopurchaser: () => {
          const { autopurchaser } = get();
          if (autopurchaser.purchased) {
            set((state) => ({
              autopurchaser: {
                ...state.autopurchaser,
                active: !state.autopurchaser.active,
              },
            }));
          }
        },
      },
    }),
    {
      name: "sequencer-storage",
      merge: (persistedState, currentState) => {
        return merge({}, currentState, persistedState);
      },
    }
  )
);

export default useStore;
