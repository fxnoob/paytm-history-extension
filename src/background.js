import '@babel/polyfill'
import Db, { Schema } from './utils/db'
import { Url as UrlLib } from './utils/url'
import { Cookie } from './utils/cookie'

const Url = new UrlLib()
const SchemaController = new Schema()
const dbController = new Db()
const cookie = new Cookie()

/** when extension is loaded first time */
dbController.get('isFirstTimeLoad').then((res) => {
  if (res === undefined) {
    dbController.set(SchemaController.data)
      .then(() => {
        dbController.set({ 'isFirstTimeLoad': true })
      })
  }
})
  .catch((e) => {})

/** Listen to chrome cookie changes */
cookie.ListenToLoginCookie()
