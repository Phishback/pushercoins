import React, { Component } from 'react';
import './History.css';
import axios from 'axios';
import moment from 'moment';

class History extends Component {
  constructor() {
    super();
    this.state = {
      todayprice: {},
      yesterdayprice: {},
      twodayprice: {},
      threedayprice: {},
      fourdayprice: {}
    }
    this.getBTCPrices = this.getBTCPrices.bind(this);
    this.getETHPrices = this.getETHPrices.bind(this);
    this.getLTCPrices = this.getLTCPrices.bind(this);
  }
  getETHPrices (date) {
    return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts=' + date);
  }

  getBTCPrices (date) {
    return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD&ts=' + date);
  }

  getLTCPrices (date) {
    return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=LTC&tsyms=USD&ts=' + date);
  }

  getTodayPrice () {
    let time = moment().unix();

    axios.all([this.getETHPrices(time), this.getBTCPrices(time), this.getLTCPrices(time)])
      .then(axios.spread((eth, btc, ltc) => {
        let f = {
          date: moment.unix(time).format("MMMM do YYYY"),
          eth: eth.data.ETH.USD,
          btc: btc.data.BTC.USD,
          ltc: ltc.data.LTC.USD
        }
        this.setState({ todayprice: f });
      }))
  }

  getYesterdayPrice () {
    let time = moment().subtract(1, 'days').unix();
    axios.all([this.getETHPrices(time), this.getBTCPrices(time), this.getLTCPrices(time)])
      .then(axios.spread((eth, btc, ltc) => {
        let f = {
          date: moment.unix(time).format("MMMM Do YYYY"),
          eth: eth.data.ETH.USD,
          btc: btc.data.BTC.USD,
          ltc: ltc.data.LTC.USD
        }
        this.setState({ yesterdayprice: f });
      }));
  }

  getTwoDaysPrice () {
    let time = moment().subtract(2, 'days').unix();

    axios.all([this.getETHPrices(time), this.getBTCPrices(time), this.getLTCPrices(time)])
      .then(axios.spread((eth, btc, ltc) => {
        let f = {
          date: moment.unix(time).format("MMMM do YYYY"),
          eth: eth.data.ETH.USD,
          btc: btc.data.BTC.USD,
          ltc: ltc.data.LTC.USD
        }
        this.setState({ twodayprice: f });
      }));
  }

  getThreeDayPrice () {
    let time = moment().subtract(3, 'days').unix();

    axios.all([this.getETHPrices(time), this.getBTCPrices(time), this.getLTCPrices(time)])
      .then(axios.spread((eth, btc, ltc) => {
        let f = {
          date: moment.unix(time).format("MMMM do YYYY"),
          eth: eth.data.ETH.USD,
          btc: btc.data.BTC.USD,
          ltc: ltc.data.LTC.USD
        }
        this.setState({ threedayprice: f });
      }));
  }

  getFourDayPrice () {
    let time = moment().subtract(4, 'days').unix();

    axios.all([this.getETHPrices(time), this.getBTCPrices(time), this.getLTCPrices(time)])
      .then(axios.spread((eth, btc, ltc) => {
        let f = {
          date: moment.unix(time).format("MMMM do YYYY"),
          eth: eth.data.ETH.USD,
          btc: btc.data.BTC.USD,
          ltc: ltc.data.LTC.USD
        }
        this.setState({ fourdayprice: f });
      }));
  }

  componentWillMount () {
    this.getTodayPrice();
    this.getYesterdayPrice();
    this.getTwoDaysPrice();
    this.getThreeDayPrice();
    this.getFourDayPrice();
  }
}