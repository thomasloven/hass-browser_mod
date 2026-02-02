import structuredClone from "@ungap/structured-clone";

function normaliseQuickBarCardConfig(card) {
  if (!card) return card;
  card = structuredClone(card);
  delete card.type;
  if (card.quick_bar_card_id) delete card.quick_bar_card_id;
  return card;
}

function findQuickBarCardInConfig(config, card_id) {
  for (const view of config.views) {
    if (view.cards) {
      for (const card of view.cards) {
        if (card.quick_bar_card_id === card_id) return card;
        // Allow for card one level deep
        if (card.cards) {
          for (const subCard of card.cards) {
            if (subCard.quick_bar_card_id === card_id) return subCard;
          }
        }
      }
    }
    if (view.sections) {
      for (const section of view.sections) {
        if (section.cards) {
          for (const card of section.cards) {
            if (card.quick_bar_card_id === card_id) return card;
            // Allow for card one level deep
            if (card.cards) {
              for (const subCard of card.cards) {
                if (subCard.quick_bar_card_id === card_id) return subCard;
              }
            }
          }
        }
      }
    }
  }
  return null;
}

export async function findQuickBarCardConfigByID(lovelaceRoot, quick_bar_card_id) {
  const lovelaceConfig = lovelaceRoot?.lovelace?.config;
  var card_id = undefined;
  var url_path = undefined
  if (quick_bar_card_id.includes('/')) {
    [url_path, card_id] = quick_bar_card_id.split('/');
  } else {
    card_id = quick_bar_card_id;
  }

  var card = null;
  if (lovelaceConfig && card_id && !url_path) {
    card = findQuickBarCardInConfig(lovelaceConfig, card_id);
  }
  else if (card_id && url_path) {
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
        card = findQuickBarCardInConfig(response, card_id);
      }
    }
  }

  return normaliseQuickBarCardConfig(card);
}
