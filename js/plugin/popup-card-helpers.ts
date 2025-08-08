import { ensureArray, hass } from "../helpers";

function popupCardMatch(card, entity, viewIndex, curView) {
  if (card.type !== 'custom:popup-card') return false;
  // Resolve card IDs
  const cardTargetEntityIDs = ensureArray(card.target?.entity_id || []);
  const cardEntityIDs =
    (card.entity && !cardTargetEntityIDs.includes(card.entity))
      ? [...cardTargetEntityIDs, card.entity]
      : cardTargetEntityIDs;
  const cardAreaIDs = ensureArray(card.target?.area_id || []);
  const cardLabelIDs = ensureArray(card.target?.label_id || []);
  const cardDeviceIDs = ensureArray(card.target?.device_id || []);
  // return match if card is a popup-card and matches the target
  return  (
            cardEntityIDs.some((e: string) => e === entity.entity_id) ||
            cardAreaIDs.some((a: string) => a === entity.area_id) ||
            cardLabelIDs.some((l: string) => entity.labels.includes(l)) ||
            cardDeviceIDs.some((d: string) => d === entity.device_id)
          )
          &&
          (
            viewIndex === curView || card.popup_card_all_views
          );
}

export function findPopupCardConfigByEntity(lovelaceRoot, entity_id) {
  const lovelaceConfig = lovelaceRoot?.lovelace?.config;
  const hass = lovelaceRoot?.hass;
  if (lovelaceConfig && hass) {
    let entity = hass.entities[entity_id];
    if (!entity) {
      // Support fake entity_id
      entity = { entity_id, area_id: undefined, device_id: undefined, labels: [] };
    }
    const curView = lovelaceRoot?._curView ?? 0;
    // Place current view at the front of the view index lookup array.
    // This allows the current view to be checked first for local cards, 
    // and then the rest of the views for global cards, keeping current view precedence.
    let viewLookup = Array.from(Array(lovelaceConfig.views.length).keys())
    viewLookup.splice(curView, 1);
    viewLookup.unshift(curView);
    for (const viewIndex of viewLookup) {
      const view = lovelaceConfig.views[viewIndex];
      if (view.cards) {
        for (const card of view.cards) {
          if (popupCardMatch(card, entity, viewIndex, curView)) return card;
          // Allow for card one level deep. This allows for a sub card in a panel dashboard for example.
          if (card.cards) {
            for (const subCard of card.cards) {
              if (popupCardMatch(subCard, entity, viewIndex, curView)) return subCard;
            }
          }
        }
      }
      if (view.sections) {
        for (const section of view.sections) {
          if (section.cards) {
            for (const card of section.cards) {
              if (popupCardMatch(card, entity, viewIndex, curView)) return card;
              // Allow for card one level deep. This allows for a sub card in a panel dashboard for example.
              if (card.cards) {
                for (const subCard of card.cards) {
                  if (popupCardMatch(subCard, entity, viewIndex, curView)) return subCard;
                }
              }
            }
          }
        }
      }
    }
  }
  return null;
}

function findCardInConfig(config, card_id) {
  for (const view of config.views) {
    if (view.cards) {
      for (const card of view.cards) {
        if (card.popup_card_id === card_id) return card;
        // Allow for card one level deep. This allows for a sub card in a panel dashboard for example.
        if (card.cards) {
          for (const subCard of card.cards) {
            if (subCard.popup_card_id === card_id) return subCard;
          }
        }
      }
    }
    if (view.sections) {
      for (const section of view.sections) {
        if (section.cards) {
          for (const card of section.cards) {
            if (card.popup_card_id === card_id) return card;
            // Allow for card one level deep. This allows for a sub card in a panel dashboard for example.
            if (card.cards) {
              for (const subCard of card.cards) {
                if (subCard.popup_card_id === card_id) return subCard;
              }
            }
          }
        }
      }
    }
  }
  return null;
}

export async function findPopupCardConfigByID(lovelaceRoot, popup_card_id) {
  const lovelaceConfig = lovelaceRoot?.lovelace?.config;
  var card_id = undefined;
  var url_path = undefined
  if (popup_card_id.includes('|')) {
    [url_path, card_id] = popup_card_id.split('|');
  } else {
    card_id = popup_card_id;
  }

  var card = null;
  if (lovelaceConfig) {
    card = findCardInConfig(lovelaceConfig, card_id);
  }
  if (!card && url_path) {
    if (window.browser_mod.connection) {
      var response;
      try {
        response = await window.browser_mod.connection.sendMessagePromise({
          type: "lovelace/config",
          url_path: url_path,
        });
      } catch (error) {
        response = null;
      }
      if (response) {
        card = findCardInConfig(response, card_id);
      }
    }
  }

  return card;
}