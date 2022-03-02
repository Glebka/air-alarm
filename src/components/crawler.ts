import Crawler from "crawler";
import { EventEmitter } from "stream";
import log from "./logger";

const logger = log.scope("crawler");

class AlarmStatusCrawler {
  private _emitter: EventEmitter;
  private _crawler: Crawler;
  constructor() {
    this._emitter = new EventEmitter();
  }
}
