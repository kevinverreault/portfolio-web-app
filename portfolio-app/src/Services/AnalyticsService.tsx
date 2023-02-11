import * as Cronitor from '@cronitorio/cronitor-rum-js'

class AnalyticsService {
  public sendEvent (eventName: string): void {
    Cronitor.track(eventName)
  }
}

export default new AnalyticsService()
