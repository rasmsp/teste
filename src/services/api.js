export default class RestApi {
  static URL = 'https://api-front-end-challenge.buildstaging.com/api/';

  static httpMethodJson(method, url, body) {
    return fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then((res) => res.json());
  }

  static httpMethod(method, url, body) {
    return fetch(url, {
      method,
      headers: {
        Accept: 'application/json'
      },
      body
    }).then((res) => res.json());
  }

  static httpGet = (url) => RestApi.httpMethodJson('GET', url);

  static httpPost = (url, body) => RestApi.httpMethod('POST', url, body);

  static getStatus = () => RestApi.httpGet(`${RestApi.URL}/status`);

  static getHeader = () => RestApi.httpGet(`${RestApi.URL}/header`);

  static getTimeline = () => RestApi.httpGet(`${RestApi.URL}/timeline`);

  static getSidebar = () => RestApi.httpGet(`${RestApi.URL}/sidebar`);

  static addExpense = (body) =>
    RestApi.httpPost(`${RestApi.URL}/expense/add`, body);
}
