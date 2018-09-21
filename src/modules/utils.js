import Vue from 'vue'

class Utils {

  boutBilling (bout, fallback = 'n/a') {
    if (!bout) {
      return fallback
    }

    let billings = [
      { key: 'main_event', value: 'Main Event' },
      { key: 'co_main_event', value: 'Co-main Event' },
      { key: 'main_card', value: 'Main Card' },
      { key: 'preliminary', value: 'Preliminary' },
      { key: 'early_preliminary', value: 'Early Preliminary' },
      { key: 'unknown', value: 'Unknown' }
    ]

    return billings.find(b => b.key === bout.billing).value
  }

  boutFighterResult (bout, fighter, fallback = 'n/a') {
    if (!bout || !fighter) {
      return fallback
    }

    if (bout.method === 'no contest') {
      return 'NC'
    }

    /** @todo Is this necessary any longer...? */
    if (bout.winner_id === null) {
      return '@todo'
    }

    if (fighter.id === bout.winner_id) {
      return 'WIN'
    }

    return 'LOSS'
  }

  /**
   * [boutMethodSummary description]
   * @param  {[type]} bout             [description]
   * @param  {String} [fallback='n/a'] [description]
   * @return {[type]}                  [description]
   */
  boutMethodSummary (bout, fallback = 'n/a') {
    if (!bout || !bout.method) {
      return fallback
    }

    let method = this.titleCase(bout.method)

    if (method === 'Ko' || method === 'Tko') {
      method = method.toUpperCase()
    }

    if (method === 'Decision') {
      return bout.sub_method ? this.titleCase(bout.sub_method) + ` ${method}` : method
    }

    return bout.sub_method ? `${method} (${bout.sub_method})` : method
  }

  boutResultVariant (bout, fighter, fallback = 'secondary') {
    if (!bout || !fighter) {
      return fallback
    }

    if (bout.method === 'no contest') {
      return 'dark'
    }

    /** @todo Is this necessary any longer...? */
    if (bout.winner_id === null) {
      return 'secondary'
    }

    if (fighter.id === bout.winner_id) {
      return 'success'
    }

    return 'danger'
  }

  boutRoute (bout) {
    return bout ? { name: 'bouts.show', params: { slug: bout.slug } } : {}
  }

  /**
   * [boutTimeSummary description]
   * @param  {[type]} bout             [description]
   * @param  {String} [fallback='n/a'] [description]
   * @return {[type]}                  [description]
   */
  boutTimeSummary (bout, fallback = 'n/a') {
    if (!bout || !bout.round || !bout.time) {
      return fallback
    }

    return `R${bout.round} ${bout.time}`
  }

  boutTitle (bout, fallback = 'n/a') {
    if (!bout) {
      return fallback
    }

    let a = bout.red_fighter ? bout.red_fighter.full_name : 'unknown'
    let b = bout.blue_fighter ? bout.blue_fighter.full_name : 'unknown'

    return `${a} vs ${b}`
  }

  boutType (bout, fallback = 'n/a') {
    if (!bout) {
      return fallback
    }

    let types = [
      { key: 'professional', value: 'Professional' },
      { key: 'professional_exhibition', value: 'Professional_exhibition' },
      { key: 'amateur', value: 'Amateur' },
      { key: 'amateur_exhibition', value: 'Amateur_exhibition' }
    ]

    return types.find(b => b.key === bout.type).value
  }

  /**
   * [boutWeight description]
   * @param  {[type]} bout             [description]
   * @param  {String} [fallback='n/a'] [description]
   * @return {[type]}                  [description]
   *
   * @todo Need to "prettify" the weight and potentially show it in lbs, kg, stone, etc.
   */
  boutWeight (bout, fallback = 'n/a') {
    if (!bout) {
      return fallback
    }

    return bout.weight
  }

  // boutWeightClass(bout, fallback = 'n/a') {
  //   if (!bout) {
  //     return fallback
  //   }
  //
  //   if (bout.is_catchweight) {
  //     let weight = this.boutWeight(bout)
  //
  //     return `Catchweight (${weight})`
  //   }
  //
  //   let weights = [
  //     { key: 115, value: 'Strawweight' },
  //     { key: 125, value: 'Flyweight' },
  //     { key: 135, value: 'Bantamweight' },
  //     { key: 145, value: 'Featherweight' },
  //     { key: 155, value: 'Lightweight' },
  //     { key: 170, value: 'Welterweight' },
  //     { key: 185, value: 'Middleweight' },
  //     { key: 205, value: 'Light Heavyweight' },
  //     { key: 265, value: 'Heavyweight' }
  //   ]
  //
  //   return weights.find(b => b.key === bout.weight).value
  // }
  //
  eventFullTitle (event, fallback = '...') {
    if (!event) {
      return fallback
    }

    return event.title + (event.subtitle ? ' - ' + event.subtitle : '')
  }

  eventRoute (event) {
    return event ? { name: 'events.show', params: {slug: event.slug} } : {}
  }

  eventStatus (event, fallback = '...') {
    if (!event) {
      return fallback
    }

    let statuses = [
      { key: 'scheduled', value: 'Scheduled' },
      { key: 'underway', value: 'Underway' },
      { key: 'finished', value: 'Finished' },
      { key: 'canceled', value: 'Canceled' }
    ]

    return statuses.find(e => e.key === event.status).value
  }

  imageProfileBucket (person) {
    if (!person.links || !person.links.twitter_username) {
      return 'upload'
    }

    return 'twitter_name'
  }

  /**
  * [imageProfileHandle description]
  * @param  {[type]} entity For now, anything with a links property (person, promotion, etc...?)
  * @return {[type]}        [description]
  */
  imageProfileHandle (entity) {
    if (!entity.links || !entity.links.twitter_username) {
      return 'v1523689704/blank-profile-picture-973460_640.png'
    }

    return `${entity.links.twitter_username}.jpg`
  }

  personRoute (person) {
    return person ? { name: 'people.show', params: { slug: person.slug } } : {}
  }

  personTwitterProfileUrl (person) {
    return `https://res.cloudinary.com/immadb/image/${this.imageProfileBucket(person)}/c_scale,w_150/${this.imageProfileHandle(person)}`
  }

  personTwitterProfileLargeUrl (person) {
    return `https://res.cloudinary.com/immadb/image/${this.imageProfileBucket(person)}/c_scale,w_300/${this.imageProfileHandle(person)}`
  }

  personTwitterProfileThumbUrl (person) {
    return `https://res.cloudinary.com/immadb/image/${this.imageProfileBucket(person)}/c_scale,w_100/${this.imageProfileHandle(person)}`
  }

  promotionTwitterProfileThumbUrl (promotion) {
    return `https://res.cloudinary.com/immadb/image/${this.imageProfileBucket(promotion)}/c_scale,w_100/${this.imageProfileHandle(promotion)}`
  }

  /**
   * [titleCase description]
   * @param  {[type]} str [description]
   * @return {[type]}     [description]
   *
   * Inspiration:
   *   - https://gist.github.com/SonyaMoisset/aa79f51d78b39639430661c03d9b1058#file-title-case-a-sentence-for-loop-wc-js
   *   - https://gomakethings.com/converting-a-string-to-title-case-with-vanilla-javascript/
   */
  titleCase (str) {
    str = str.split(' ')
    // str = str.toLowerCase().split(' ')
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1)
    }

    return str.join(' ')
  }
}

Vue.prototype.$utils = new Utils()
