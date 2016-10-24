# cccstc-app

## Build Android App Release Version

1. Locate your keystore file
2. Add the follow into `~/.gradle/gradle.properties`
 ```
CCCSTC_APP_RELEASE_STORE_FILE=/your/absolute/path/to/release-key.keystore
CCCSTC_APP_RELEASE_KEY_ALIAS=cccstc
CCCSTC_APP_RELEASE_STORE_PASSWORD=*****
CCCSTC_APP_RELEASE_KEY_PASSWORD=*****
```
3. Run `cd android && ./gradlew assembleRelease`

### References

- https://facebook.github.io/react-native/docs/signed-apk-android.html
