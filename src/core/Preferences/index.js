const NETFLIX_HOTKEYS_ENABLED_KEY = 'NETFLIX_HOTKEYS_ENABLED'
const POWER_ENABLED_KEY = 'SKIP_INTRO_ENABLED'
const USERNAME_LIST_KEY = 'USERNAME_LIST'
const AUTO_LOGIN_ENABLED_KEY = 'AUTO_LOGIN_ENABLED_KEY'
const DEFAULT_USERNAME_KEY = 'DEFAULT_USERNAME'
const PROFILE_PASSWORD_KEY = 'PROFILE_PASSWORD'

let _isNetflixHotkeysEnabled = false
let _isPowerSkipEnabled = false
let _usernameList = []
let _isAutoLoginEnabled = false
let _defaultUsername = ''
let _profilePassword = ''
class Preferences {
  /**
   * Whether user has opted to enable Netflix hotkeys extension. In short this is a overall switch.
   * @type {boolean}
   */
  get isNetflixHotkeysEnabled() {
    return _isNetflixHotkeysEnabled
  }
  set isNetflixHotkeysEnabled(value) {
    _isNetflixHotkeysEnabled = value
    chrome.storage.local.set({ [NETFLIX_HOTKEYS_ENABLED_KEY]: value })
  }

  /**
   * Whether user has opted to enable power skip feature.
   * @type {boolean}
   */
  get isPowerSkipEnabled() {
    return _isPowerSkipEnabled
  }
  set isPowerSkipEnabled(value) {
    _isPowerSkipEnabled = value
    chrome.storage.local.set({ [POWER_ENABLED_KEY]: value })
  }

  /**
   * Usernames of all the users that are logged in to Netflix.
   * @type {string[]}
   */
  get usernameList() {
    return _usernameList
  }
  set usernameList(value) {
    _usernameList = value
    chrome.storage.local.set({ [USERNAME_LIST_KEY]: value })
  }

  /**
   * Whether user has opted to enable auto login feature.
   * @type {boolean}
   */
  get isAutoLoginEnabled() {
    return _isAutoLoginEnabled
  }
  set isAutoLoginEnabled(value) {
    _isAutoLoginEnabled = value
    chrome.storage.local.set({ [AUTO_LOGIN_ENABLED_KEY]: value })
  }

  /**
   * Default username to be used for auto login.
   * @type {string}
   */
  get defaultUsername() {
    return _defaultUsername
  }
  set defaultUsername(value) {
    _defaultUsername = value
    chrome.storage.local.set({ [DEFAULT_USERNAME_KEY]: value })
  }

  /**
   * Password of the default username to be used for auto login.
   * @type {string}
   */
  get profilePassword() {
    return _profilePassword
  }
  set profilePassword(value) {
    _profilePassword = value
    chrome.storage.local.set({ [PROFILE_PASSWORD_KEY]: value })
  }
}

let preferences = new Preferences()

// Initially load all preferences
chrome.storage.local.get(
  [
    NETFLIX_HOTKEYS_ENABLED_KEY,
    POWER_ENABLED_KEY,
    USERNAME_LIST_KEY,
    AUTO_LOGIN_ENABLED_KEY,
    DEFAULT_USERNAME_KEY,
    PROFILE_PASSWORD_KEY,
  ],
  (result) => {
    _isNetflixHotkeysEnabled = result[NETFLIX_HOTKEYS_ENABLED_KEY] || false
    _isPowerSkipEnabled = result[POWER_ENABLED_KEY] || false
    _usernameList = result[USERNAME_LIST_KEY] || []
    _isAutoLoginEnabled = result[AUTO_LOGIN_ENABLED_KEY] || false
    _defaultUsername = result[DEFAULT_USERNAME_KEY] || ''
    _profilePassword = result[PROFILE_PASSWORD_KEY] || ''
  },
)

// Listen for changes to preferences
chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let key in changes) {
    if (key === NETFLIX_HOTKEYS_ENABLED_KEY) {
      _isNetflixHotkeysEnabled = changes[key].newValue
    } else if (key === POWER_ENABLED_KEY) {
      _isPowerSkipEnabled = changes[key].newValue
    } else if (key === USERNAME_LIST_KEY) {
      _usernameList = changes[key].newValue
    } else if (key === AUTO_LOGIN_ENABLED_KEY) {
      _isAutoLoginEnabled = changes[key].newValue
    } else if (key === DEFAULT_USERNAME_KEY) {
      _defaultUsername = changes[key].newValue
    }
  }
})

export default preferences
