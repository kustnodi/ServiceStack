import { combinePaths, JsonServiceClient, lastLeftPart, trimEnd } from "@servicestack/client"
import { Server } from "../../lib/types"
import { createForms, createMeta } from "../../shared/js/createForms"

/*minify:*/

let BASE_URL = lastLeftPart(trimEnd(document.baseURI,'/'),'/')
/** @type {string|null} */
let bearerToken = null
/** @type {string|null} */
let authsecret = null

function createClient(fn) {
    return new JsonServiceClient(BASE_URL).apply(c => {
        c.bearerToken = bearerToken
        c.enableAutoRefreshToken = false
        if (authsecret) c.headers.set('authsecret', authsecret)
        let apiFmt = Server.httpHandlers['ApiHandlers.Json']
        if (apiFmt)
            c.basePath = apiFmt.replace('/{Request}', '')
        if (fn) fn(c)
    })
}

/** Resolve Absolute URL for API Name
 * @param {string} op
 * @return {string} */
export function resolveApiUrl(op) {
    return combinePaths(client.replyBaseUrl,op)
}

/** App's pre-configured `JsonServiceClient` instance for making typed API requests */
export let client = createClient()

let appName = 'admin-ui'
export let Meta = createMeta(Server, appName)
export let Forms = createForms(Meta, Server.ui.admin.css, Server.ui)

/*:minify*/
