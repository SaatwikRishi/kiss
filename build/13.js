(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{406:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",function(){return GoogleAuthProvider}),__webpack_require__.d(__webpack_exports__,"b",function(){return getAuth}),__webpack_require__.d(__webpack_exports__,"c",function(){return signInWithPopup});var index_esm2017=__webpack_require__(2),esm_index_esm2017=__webpack_require__(9),tslib_es6=__webpack_require__(107),dist_esm_index_esm2017=__webpack_require__(6),component_dist_esm_index_esm2017=__webpack_require__(4);function _prodErrorMap(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const prodErrorMap=_prodErrorMap,_DEFAULT_AUTH_ERROR_FACTORY=new index_esm2017.b("auth","Firebase",{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}),logClient=new dist_esm_index_esm2017.b("@firebase/auth");function _logError(msg,...args){logClient.logLevel<=dist_esm_index_esm2017.a.ERROR&&logClient.error(`Auth (${esm_index_esm2017.a}): ${msg}`,...args)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _fail(authOrCode,...rest){throw createErrorInternal(authOrCode,...rest)}function _createError(authOrCode,...rest){return createErrorInternal(authOrCode,...rest)}function _errorWithCustomMessage(auth,code,message){const errorMap=Object.assign(Object.assign({},prodErrorMap()),{[code]:message});return new index_esm2017.b("auth","Firebase",errorMap).create(code,{appName:auth.name})}function _assertInstanceOf(auth,object,instance){if(!(object instanceof instance))throw instance.name!==object.constructor.name&&_fail(auth,"argument-error"),_errorWithCustomMessage(auth,"argument-error",`Type of ${object.constructor.name} does not match expected instance.`+"Did you pass a reference from a different Auth SDK?")}function createErrorInternal(authOrCode,...rest){if("string"!=typeof authOrCode){const code=rest[0],fullParams=[...rest.slice(1)];return fullParams[0]&&(fullParams[0].appName=authOrCode.name),authOrCode._errorFactory.create(code,...fullParams)}return _DEFAULT_AUTH_ERROR_FACTORY.create(authOrCode,...rest)}function _assert(assertion,authOrCode,...rest){if(!assertion)throw createErrorInternal(authOrCode,...rest)}function debugFail(failure){const message="INTERNAL ASSERTION FAILED: "+failure;throw _logError(message),new Error(message)}function debugAssert(assertion,message){assertion||debugFail(message)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const instanceCache=new Map;function _getInstance(cls){debugAssert(cls instanceof Function,"Expected a class definition");let instance=instanceCache.get(cls);return instance?(debugAssert(instance instanceof cls,"Instance stored in cache mismatched with class"),instance):(instance=new cls,instanceCache.set(cls,instance),instance)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _getCurrentUrl(){var _a;return"undefined"!=typeof self&&(null===(_a=self.location)||void 0===_a?void 0:_a.href)||""}function _isHttpOrHttps(){return"http:"===_getCurrentScheme()||"https:"===_getCurrentScheme()}function _getCurrentScheme(){var _a;return"undefined"!=typeof self&&(null===(_a=self.location)||void 0===_a?void 0:_a.protocol)||null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class index_342f2197_Delay{constructor(shortDelay,longDelay){this.shortDelay=shortDelay,this.longDelay=longDelay,debugAssert(longDelay>shortDelay,"Short delay should be less than long delay!"),this.isMobile=Object(index_esm2017.n)()||Object(index_esm2017.o)()}get(){return"undefined"!=typeof navigator&&navigator&&"onLine"in navigator&&"boolean"==typeof navigator.onLine&&(_isHttpOrHttps()||Object(index_esm2017.k)()||"connection"in navigator)&&!navigator.onLine?Math.min(5e3,this.shortDelay):this.isMobile?this.longDelay:this.shortDelay}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _emulatorUrl(config,path){debugAssert(config.emulator,"Emulator should always be set here");const{url:url}=config.emulator;return path?`${url}${path.startsWith("/")?path.slice(1):path}`:url}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FetchProvider{static initialize(fetchImpl,headersImpl,responseImpl){this.fetchImpl=fetchImpl,headersImpl&&(this.headersImpl=headersImpl),responseImpl&&(this.responseImpl=responseImpl)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:void debugFail("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:void debugFail("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:void debugFail("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const SERVER_ERROR_MAP={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error"},DEFAULT_API_TIMEOUT_MS=new index_342f2197_Delay(3e4,6e4);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _addTidIfNecessary(auth,request){return auth.tenantId&&!request.tenantId?Object.assign(Object.assign({},request),{tenantId:auth.tenantId}):request}async function _performApiRequest(auth,method,path,request,customErrorMap={}){return _performFetchWithErrorHandling(auth,customErrorMap,async()=>{let body={},params={};request&&("GET"===method?params=request:body={body:JSON.stringify(request)});const query=Object(index_esm2017.p)(Object.assign({key:auth.config.apiKey},params)).slice(1),headers=await auth._getAdditionalHeaders();return headers["Content-Type"]="application/json",auth.languageCode&&(headers["X-Firebase-Locale"]=auth.languageCode),FetchProvider.fetch()(_getFinalTarget(auth,auth.config.apiHost,path,query),Object.assign({method:method,headers:headers,referrerPolicy:"no-referrer"},body))})}async function _performFetchWithErrorHandling(auth,customErrorMap,fetchFn){auth._canInitEmulator=!1;const errorMap=Object.assign(Object.assign({},SERVER_ERROR_MAP),customErrorMap);try{const networkTimeout=new NetworkTimeout(auth),response=await Promise.race([fetchFn(),networkTimeout.promise]);networkTimeout.clearNetworkTimeout();const json=await response.json();if("needConfirmation"in json)throw _makeTaggedError(auth,"account-exists-with-different-credential",json);if(response.ok&&!("errorMessage"in json))return json;{const errorMessage=response.ok?json.errorMessage:json.error.message,[serverErrorCode,serverErrorMessage]=errorMessage.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===serverErrorCode)throw _makeTaggedError(auth,"credential-already-in-use",json);if("EMAIL_EXISTS"===serverErrorCode)throw _makeTaggedError(auth,"email-already-in-use",json);const authError=errorMap[serverErrorCode]||serverErrorCode.toLowerCase().replace(/[_\s]+/g,"-");if(serverErrorMessage)throw _errorWithCustomMessage(auth,authError,serverErrorMessage);_fail(auth,authError)}}catch(e){if(e instanceof index_esm2017.c)throw e;_fail(auth,"network-request-failed")}}async function _performSignInRequest(auth,method,path,request,customErrorMap={}){const serverResponse=await _performApiRequest(auth,method,path,request,customErrorMap);return"mfaPendingCredential"in serverResponse&&_fail(auth,"multi-factor-auth-required",{_serverResponse:serverResponse}),serverResponse}function _getFinalTarget(auth,host,path,query){const base=`${host}${path}?${query}`;return auth.config.emulator?_emulatorUrl(auth.config,base):`${auth.config.apiScheme}://${base}`}class NetworkTimeout{constructor(auth){this.auth=auth,this.timer=null,this.promise=new Promise((_,reject)=>{this.timer=setTimeout(()=>reject(_createError(this.auth,"network-request-failed")),DEFAULT_API_TIMEOUT_MS.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function _makeTaggedError(auth,code,response){const errorParams={appName:auth.name};response.email&&(errorParams.email=response.email),response.phoneNumber&&(errorParams.phoneNumber=response.phoneNumber);const error=_createError(auth,code,errorParams);return error.customData._tokenResponse=response,error}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function utcTimestampToDateString(utcTimestamp){if(utcTimestamp)try{const date=new Date(Number(utcTimestamp));if(!isNaN(date.getTime()))return date.toUTCString()}catch(e){}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function secondsStringToMilliseconds(seconds){return 1e3*Number(seconds)}function _parseToken(token){const[algorithm,payload,signature]=token.split(".");if(void 0===algorithm||void 0===payload||void 0===signature)return _logError("JWT malformed, contained fewer than 3 sections"),null;try{const decoded=Object(index_esm2017.d)(payload);return decoded?JSON.parse(decoded):(_logError("Failed to decode base64 JWT payload"),null)}catch(e){return _logError("Caught error parsing JWT payload as JSON",e),null}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function _logoutIfInvalidated(user,promise,bypassAuthState=!1){if(bypassAuthState)return promise;try{return await promise}catch(e){throw e instanceof index_esm2017.c&&function({code:code}){return"auth/user-disabled"===code||"auth/user-token-expired"===code}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e)&&user.auth.currentUser===user&&await user.auth.signOut(),e}}class ProactiveRefresh{constructor(user){this.user=user,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(wasError){var _a;if(wasError){const interval=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),interval}{this.errorBackoff=3e4;const interval=(null!==(_a=this.user.stsTokenManager.expirationTime)&&void 0!==_a?_a:0)-Date.now()-3e5;return Math.max(0,interval)}}schedule(wasError=!1){if(!this.isRunning)return;const interval=this.getInterval(wasError);this.timerId=setTimeout(async()=>{await this.iteration()},interval)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){return void("auth/network-request-failed"===e.code&&this.schedule(!0))}this.schedule()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UserMetadata{constructor(createdAt,lastLoginAt){this.createdAt=createdAt,this.lastLoginAt=lastLoginAt,this._initializeTime()}_initializeTime(){this.lastSignInTime=utcTimestampToDateString(this.lastLoginAt),this.creationTime=utcTimestampToDateString(this.createdAt)}_copy(metadata){this.createdAt=metadata.createdAt,this.lastLoginAt=metadata.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _reloadWithoutSaving(user){var _a;const auth=user.auth,idToken=await user.getIdToken(),response=await _logoutIfInvalidated(user,async function(auth,request){return _performApiRequest(auth,"POST","/v1/accounts:lookup",request)}(auth,{idToken:idToken}));_assert(null===response||void 0===response?void 0:response.users.length,auth,"internal-error");const coreAccount=response.users[0];user._notifyReloadListener(coreAccount);const newProviderData=(null===(_a=coreAccount.providerUserInfo)||void 0===_a?void 0:_a.length)?function(providers){return providers.map(_a=>{var{providerId:providerId}=_a,provider=Object(tslib_es6.c)(_a,["providerId"]);return{providerId:providerId,uid:provider.rawId||"",displayName:provider.displayName||null,email:provider.email||null,phoneNumber:provider.phoneNumber||null,photoURL:provider.photoUrl||null}})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(coreAccount.providerUserInfo):[],providerData=function(original,newData){return[...original.filter(o=>!newData.some(n=>n.providerId===o.providerId)),...newData]}(user.providerData,newProviderData),oldIsAnonymous=user.isAnonymous,newIsAnonymous=!(user.email&&coreAccount.passwordHash||(null===providerData||void 0===providerData?void 0:providerData.length)),isAnonymous=!!oldIsAnonymous&&newIsAnonymous,updates={uid:coreAccount.localId,displayName:coreAccount.displayName||null,photoURL:coreAccount.photoUrl||null,email:coreAccount.email||null,emailVerified:coreAccount.emailVerified||!1,phoneNumber:coreAccount.phoneNumber||null,tenantId:coreAccount.tenantId||null,providerData:providerData,metadata:new UserMetadata(coreAccount.createdAt,coreAccount.lastLoginAt),isAnonymous:isAnonymous};Object.assign(user,updates)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class StsTokenManager{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(response){_assert(response.idToken,"internal-error"),_assert(void 0!==response.idToken,"internal-error"),_assert(void 0!==response.refreshToken,"internal-error");const expiresIn="expiresIn"in response&&void 0!==response.expiresIn?Number(response.expiresIn):function(token){const parsedToken=_parseToken(token);return _assert(parsedToken,"internal-error"),_assert(void 0!==parsedToken.exp,"internal-error"),_assert(void 0!==parsedToken.iat,"internal-error"),Number(parsedToken.exp)-Number(parsedToken.iat)}(response.idToken);this.updateTokensAndExpiration(response.idToken,response.refreshToken,expiresIn)}async getToken(auth,forceRefresh=!1){return _assert(!this.accessToken||this.refreshToken,auth,"user-token-expired"),forceRefresh||!this.accessToken||this.isExpired?this.refreshToken?(await this.refresh(auth,this.refreshToken),this.accessToken):null:this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(auth,oldToken){const{accessToken:accessToken,refreshToken:refreshToken,expiresIn:expiresIn}=await async function(auth,refreshToken){const response=await _performFetchWithErrorHandling(auth,{},async()=>{const body=Object(index_esm2017.p)({grant_type:"refresh_token",refresh_token:refreshToken}).slice(1),{tokenApiHost:tokenApiHost,apiKey:apiKey}=auth.config,url=_getFinalTarget(auth,tokenApiHost,"/v1/token",`key=${apiKey}`),headers=await auth._getAdditionalHeaders();return headers["Content-Type"]="application/x-www-form-urlencoded",FetchProvider.fetch()(url,{method:"POST",headers:headers,body:body})});return{accessToken:response.access_token,expiresIn:response.expires_in,refreshToken:response.refresh_token}}(auth,oldToken);this.updateTokensAndExpiration(accessToken,refreshToken,Number(expiresIn))}updateTokensAndExpiration(accessToken,refreshToken,expiresInSec){this.refreshToken=refreshToken||null,this.accessToken=accessToken||null,this.expirationTime=Date.now()+1e3*expiresInSec}static fromJSON(appName,object){const{refreshToken:refreshToken,accessToken:accessToken,expirationTime:expirationTime}=object,manager=new StsTokenManager;return refreshToken&&(_assert("string"==typeof refreshToken,"internal-error",{appName:appName}),manager.refreshToken=refreshToken),accessToken&&(_assert("string"==typeof accessToken,"internal-error",{appName:appName}),manager.accessToken=accessToken),expirationTime&&(_assert("number"==typeof expirationTime,"internal-error",{appName:appName}),manager.expirationTime=expirationTime),manager}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(stsTokenManager){this.accessToken=stsTokenManager.accessToken,this.refreshToken=stsTokenManager.refreshToken,this.expirationTime=stsTokenManager.expirationTime}_clone(){return Object.assign(new StsTokenManager,this.toJSON())}_performRefresh(){return debugFail("not implemented")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function assertStringOrUndefined(assertion,appName){_assert("string"==typeof assertion||void 0===assertion,"internal-error",{appName:appName})}class index_342f2197_UserImpl{constructor(_a){var{uid:uid,auth:auth,stsTokenManager:stsTokenManager}=_a,opt=Object(tslib_es6.c)(_a,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new ProactiveRefresh(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=uid,this.auth=auth,this.stsTokenManager=stsTokenManager,this.accessToken=stsTokenManager.accessToken,this.displayName=opt.displayName||null,this.email=opt.email||null,this.emailVerified=opt.emailVerified||!1,this.phoneNumber=opt.phoneNumber||null,this.photoURL=opt.photoURL||null,this.isAnonymous=opt.isAnonymous||!1,this.tenantId=opt.tenantId||null,this.providerData=opt.providerData?[...opt.providerData]:[],this.metadata=new UserMetadata(opt.createdAt||void 0,opt.lastLoginAt||void 0)}async getIdToken(forceRefresh){const accessToken=await _logoutIfInvalidated(this,this.stsTokenManager.getToken(this.auth,forceRefresh));return _assert(accessToken,this.auth,"internal-error"),this.accessToken!==accessToken&&(this.accessToken=accessToken,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),accessToken}getIdTokenResult(forceRefresh){return async function(user,forceRefresh=!1){const userInternal=Object(index_esm2017.i)(user),token=await userInternal.getIdToken(forceRefresh),claims=_parseToken(token);_assert(claims&&claims.exp&&claims.auth_time&&claims.iat,userInternal.auth,"internal-error");const firebase="object"==typeof claims.firebase?claims.firebase:void 0,signInProvider=null===firebase||void 0===firebase?void 0:firebase.sign_in_provider;return{claims:claims,token:token,authTime:utcTimestampToDateString(secondsStringToMilliseconds(claims.auth_time)),issuedAtTime:utcTimestampToDateString(secondsStringToMilliseconds(claims.iat)),expirationTime:utcTimestampToDateString(secondsStringToMilliseconds(claims.exp)),signInProvider:signInProvider||null,signInSecondFactor:(null===firebase||void 0===firebase?void 0:firebase.sign_in_second_factor)||null}}(this,forceRefresh)}reload(){return async function(user){const userInternal=Object(index_esm2017.i)(user);await _reloadWithoutSaving(userInternal),await userInternal.auth._persistUserIfCurrent(userInternal),userInternal.auth._notifyListenersIfCurrent(userInternal)}(this)}_assign(user){this!==user&&(_assert(this.uid===user.uid,this.auth,"internal-error"),this.displayName=user.displayName,this.photoURL=user.photoURL,this.email=user.email,this.emailVerified=user.emailVerified,this.phoneNumber=user.phoneNumber,this.isAnonymous=user.isAnonymous,this.tenantId=user.tenantId,this.providerData=user.providerData.map(userInfo=>Object.assign({},userInfo)),this.metadata._copy(user.metadata),this.stsTokenManager._assign(user.stsTokenManager))}_clone(auth){return new index_342f2197_UserImpl(Object.assign(Object.assign({},this),{auth:auth,stsTokenManager:this.stsTokenManager._clone()}))}_onReload(callback){_assert(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=callback,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(userInfo){this.reloadListener?this.reloadListener(userInfo):this.reloadUserInfo=userInfo}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(response,reload=!1){let tokensRefreshed=!1;response.idToken&&response.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(response),tokensRefreshed=!0),reload&&await _reloadWithoutSaving(this),await this.auth._persistUserIfCurrent(this),tokensRefreshed&&this.auth._notifyListenersIfCurrent(this)}async delete(){const idToken=await this.getIdToken();return await _logoutIfInvalidated(this,async function(auth,request){return _performApiRequest(auth,"POST","/v1/accounts:delete",request)}(this.auth,{idToken:idToken})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(userInfo=>Object.assign({},userInfo)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(auth,object){var _a,_b,_c,_d,_e,_f,_g,_h;const displayName=null!==(_a=object.displayName)&&void 0!==_a?_a:void 0,email=null!==(_b=object.email)&&void 0!==_b?_b:void 0,phoneNumber=null!==(_c=object.phoneNumber)&&void 0!==_c?_c:void 0,photoURL=null!==(_d=object.photoURL)&&void 0!==_d?_d:void 0,tenantId=null!==(_e=object.tenantId)&&void 0!==_e?_e:void 0,_redirectEventId=null!==(_f=object._redirectEventId)&&void 0!==_f?_f:void 0,createdAt=null!==(_g=object.createdAt)&&void 0!==_g?_g:void 0,lastLoginAt=null!==(_h=object.lastLoginAt)&&void 0!==_h?_h:void 0,{uid:uid,emailVerified:emailVerified,isAnonymous:isAnonymous,providerData:providerData,stsTokenManager:plainObjectTokenManager}=object;_assert(uid&&plainObjectTokenManager,auth,"internal-error");const stsTokenManager=StsTokenManager.fromJSON(this.name,plainObjectTokenManager);_assert("string"==typeof uid,auth,"internal-error"),assertStringOrUndefined(displayName,auth.name),assertStringOrUndefined(email,auth.name),_assert("boolean"==typeof emailVerified,auth,"internal-error"),_assert("boolean"==typeof isAnonymous,auth,"internal-error"),assertStringOrUndefined(phoneNumber,auth.name),assertStringOrUndefined(photoURL,auth.name),assertStringOrUndefined(tenantId,auth.name),assertStringOrUndefined(_redirectEventId,auth.name),assertStringOrUndefined(createdAt,auth.name),assertStringOrUndefined(lastLoginAt,auth.name);const user=new index_342f2197_UserImpl({uid:uid,auth:auth,email:email,emailVerified:emailVerified,displayName:displayName,isAnonymous:isAnonymous,photoURL:photoURL,phoneNumber:phoneNumber,tenantId:tenantId,stsTokenManager:stsTokenManager,createdAt:createdAt,lastLoginAt:lastLoginAt});return providerData&&Array.isArray(providerData)&&(user.providerData=providerData.map(userInfo=>Object.assign({},userInfo))),_redirectEventId&&(user._redirectEventId=_redirectEventId),user}static async _fromIdTokenResponse(auth,idTokenResponse,isAnonymous=!1){const stsTokenManager=new StsTokenManager;stsTokenManager.updateFromServerResponse(idTokenResponse);const user=new index_342f2197_UserImpl({uid:idTokenResponse.localId,auth:auth,stsTokenManager:stsTokenManager,isAnonymous:isAnonymous});return await _reloadWithoutSaving(user),user}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class InMemoryPersistence{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(key,value){this.storage[key]=value}async _get(key){const value=this.storage[key];return void 0===value?null:value}async _remove(key){delete this.storage[key]}_addListener(_key,_listener){}_removeListener(_key,_listener){}}InMemoryPersistence.type="NONE";const inMemoryPersistence=InMemoryPersistence;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _persistenceKeyName(key,apiKey,appName){return`firebase:${key}:${apiKey}:${appName}`}class PersistenceUserManager{constructor(persistence,auth,userKey){this.persistence=persistence,this.auth=auth,this.userKey=userKey;const{config:config,name:name}=this.auth;this.fullUserKey=_persistenceKeyName(this.userKey,config.apiKey,name),this.fullPersistenceKey=_persistenceKeyName("persistence",config.apiKey,name),this.boundEventHandler=auth._onStorageEvent.bind(auth),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(user){return this.persistence._set(this.fullUserKey,user.toJSON())}async getCurrentUser(){const blob=await this.persistence._get(this.fullUserKey);return blob?index_342f2197_UserImpl._fromJSON(this.auth,blob):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(newPersistence){if(this.persistence===newPersistence)return;const currentUser=await this.getCurrentUser();return await this.removeCurrentUser(),this.persistence=newPersistence,currentUser?this.setCurrentUser(currentUser):void 0}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(auth,persistenceHierarchy,userKey="authUser"){if(!persistenceHierarchy.length)return new PersistenceUserManager(_getInstance(inMemoryPersistence),auth,userKey);const availablePersistences=(await Promise.all(persistenceHierarchy.map(async persistence=>{if(await persistence._isAvailable())return persistence}))).filter(persistence=>persistence);let selectedPersistence=availablePersistences[0]||_getInstance(inMemoryPersistence);const key=_persistenceKeyName(userKey,auth.config.apiKey,auth.name);let userToMigrate=null;for(const persistence of persistenceHierarchy)try{const blob=await persistence._get(key);if(blob){const user=index_342f2197_UserImpl._fromJSON(auth,blob);persistence!==selectedPersistence&&(userToMigrate=user),selectedPersistence=persistence;break}}catch(_a){}const migrationHierarchy=availablePersistences.filter(p=>p._shouldAllowMigration);return selectedPersistence._shouldAllowMigration&&migrationHierarchy.length?(selectedPersistence=migrationHierarchy[0],userToMigrate&&await selectedPersistence._set(key,userToMigrate.toJSON()),await Promise.all(persistenceHierarchy.map(async persistence=>{if(persistence!==selectedPersistence)try{await persistence._remove(key)}catch(_a){}})),new PersistenceUserManager(selectedPersistence,auth,userKey)):new PersistenceUserManager(selectedPersistence,auth,userKey)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _getBrowserName(userAgent){const ua=userAgent.toLowerCase();if(ua.includes("opera/")||ua.includes("opr/")||ua.includes("opios/"))return"Opera";if(_isIEMobile(ua))return"IEMobile";if(ua.includes("msie")||ua.includes("trident/"))return"IE";if(ua.includes("edge/"))return"Edge";if(_isFirefox(ua))return"Firefox";if(ua.includes("silk/"))return"Silk";if(_isBlackBerry(ua))return"Blackberry";if(_isWebOS(ua))return"Webos";if(_isSafari(ua))return"Safari";if((ua.includes("chrome/")||_isChromeIOS(ua))&&!ua.includes("edge/"))return"Chrome";if(_isAndroid(ua))return"Android";{const re=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,matches=userAgent.match(re);if(2===(null===matches||void 0===matches?void 0:matches.length))return matches[1]}return"Other"}function _isFirefox(ua=Object(index_esm2017.j)()){return/firefox\//i.test(ua)}function _isSafari(userAgent=Object(index_esm2017.j)()){const ua=userAgent.toLowerCase();return ua.includes("safari/")&&!ua.includes("chrome/")&&!ua.includes("crios/")&&!ua.includes("android")}function _isChromeIOS(ua=Object(index_esm2017.j)()){return/crios\//i.test(ua)}function _isIEMobile(ua=Object(index_esm2017.j)()){return/iemobile/i.test(ua)}function _isAndroid(ua=Object(index_esm2017.j)()){return/android/i.test(ua)}function _isBlackBerry(ua=Object(index_esm2017.j)()){return/blackberry/i.test(ua)}function _isWebOS(ua=Object(index_esm2017.j)()){return/webos/i.test(ua)}function _isIOS(ua=Object(index_esm2017.j)()){return/iphone|ipad|ipod/i.test(ua)}function _isMobileBrowser(ua=Object(index_esm2017.j)()){return _isIOS(ua)||_isAndroid(ua)||_isWebOS(ua)||_isBlackBerry(ua)||/windows phone/i.test(ua)||_isIEMobile(ua)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _getClientVersion(clientPlatform,frameworks=[]){let reportedPlatform;switch(clientPlatform){case"Browser":reportedPlatform=_getBrowserName(Object(index_esm2017.j)());break;case"Worker":reportedPlatform=`${_getBrowserName(Object(index_esm2017.j)())}-${clientPlatform}`;break;default:reportedPlatform=clientPlatform}const reportedFrameworks=frameworks.length?frameworks.join(","):"FirebaseCore-web";return`${reportedPlatform}/JsCore/${esm_index_esm2017.a}/${reportedFrameworks}`}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class index_342f2197_AuthImpl{constructor(app,config){this.app=app,this.config=config,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new index_342f2197_Subscription(this),this.idTokenSubscription=new index_342f2197_Subscription(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=_DEFAULT_AUTH_ERROR_FACTORY,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=app.name,this.clientVersion=config.sdkClientVersion}_initializeWithPersistence(persistenceHierarchy,popupRedirectResolver){return popupRedirectResolver&&(this._popupRedirectResolver=_getInstance(popupRedirectResolver)),this._initializationPromise=this.queue(async()=>{var _a,_b;if(!this._deleted&&(this.persistenceManager=await PersistenceUserManager.create(this,persistenceHierarchy),!this._deleted)){if(null===(_a=this._popupRedirectResolver)||void 0===_a?void 0:_a._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(e){}await this.initializeCurrentUser(popupRedirectResolver),this.lastNotifiedUid=(null===(_b=this.currentUser)||void 0===_b?void 0:_b.uid)||null,this._deleted||(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const user=await this.assertedPersistence.getCurrentUser();return this.currentUser||user?this.currentUser&&user&&this.currentUser.uid===user.uid?(this._currentUser._assign(user),void await this.currentUser.getIdToken()):void await this._updateCurrentUser(user):void 0}async initializeCurrentUser(popupRedirectResolver){var _a;let storedUser=await this.assertedPersistence.getCurrentUser();if(popupRedirectResolver&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const redirectUserEventId=null===(_a=this.redirectUser)||void 0===_a?void 0:_a._redirectEventId,storedUserEventId=null===storedUser||void 0===storedUser?void 0:storedUser._redirectEventId,result=await this.tryRedirectSignIn(popupRedirectResolver);redirectUserEventId&&redirectUserEventId!==storedUserEventId||null===result||void 0===result||!result.user||(storedUser=result.user)}return storedUser?storedUser._redirectEventId?(_assert(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===storedUser._redirectEventId?this.directlySetCurrentUser(storedUser):this.reloadAndSetCurrentUserOrClear(storedUser)):this.reloadAndSetCurrentUserOrClear(storedUser):this.directlySetCurrentUser(null)}async tryRedirectSignIn(redirectResolver){let result=null;try{result=await this._popupRedirectResolver._completeRedirectFn(this,redirectResolver,!0)}catch(e){await this._setRedirectUser(null)}return result}async reloadAndSetCurrentUserOrClear(user){try{await _reloadWithoutSaving(user)}catch(e){if("auth/network-request-failed"!==e.code)return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(user)}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;const navigatorLanguage=navigator;return navigatorLanguage.languages&&navigatorLanguage.languages[0]||navigatorLanguage.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(userExtern){const user=userExtern?Object(index_esm2017.i)(userExtern):null;return user&&_assert(user.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(user&&user._clone(this))}async _updateCurrentUser(user){if(!this._deleted)return user&&_assert(this.tenantId===user.tenantId,this,"tenant-id-mismatch"),this.queue(async()=>{await this.directlySetCurrentUser(user),this.notifyAuthListeners()})}async signOut(){return(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null)}setPersistence(persistence){return this.queue(async()=>{await this.assertedPersistence.setPersistence(_getInstance(persistence))})}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(errorMap){this._errorFactory=new index_esm2017.b("auth","Firebase",errorMap())}onAuthStateChanged(nextOrObserver,error,completed){return this.registerStateListener(this.authStateSubscription,nextOrObserver,error,completed)}onIdTokenChanged(nextOrObserver,error,completed){return this.registerStateListener(this.idTokenSubscription,nextOrObserver,error,completed)}toJSON(){var _a;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:null===(_a=this._currentUser)||void 0===_a?void 0:_a.toJSON()}}async _setRedirectUser(user,popupRedirectResolver){const redirectManager=await this.getOrInitRedirectPersistenceManager(popupRedirectResolver);return null===user?redirectManager.removeCurrentUser():redirectManager.setCurrentUser(user)}async getOrInitRedirectPersistenceManager(popupRedirectResolver){if(!this.redirectPersistenceManager){const resolver=popupRedirectResolver&&_getInstance(popupRedirectResolver)||this._popupRedirectResolver;_assert(resolver,this,"argument-error"),this.redirectPersistenceManager=await PersistenceUserManager.create(this,[_getInstance(resolver._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(id){var _a,_b;return this._isInitialized&&await this.queue(async()=>{}),(null===(_a=this._currentUser)||void 0===_a?void 0:_a._redirectEventId)===id?this._currentUser:(null===(_b=this.redirectUser)||void 0===_b?void 0:_b._redirectEventId)===id?this.redirectUser:null}async _persistUserIfCurrent(user){if(user===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(user))}_notifyListenersIfCurrent(user){user===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var _a,_b;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const currentUid=null!==(_b=null===(_a=this.currentUser)||void 0===_a?void 0:_a.uid)&&void 0!==_b?_b:null;this.lastNotifiedUid!==currentUid&&(this.lastNotifiedUid=currentUid,this.authStateSubscription.next(this.currentUser))}registerStateListener(subscription,nextOrObserver,error,completed){if(this._deleted)return()=>{};const cb="function"==typeof nextOrObserver?nextOrObserver:nextOrObserver.next.bind(nextOrObserver),promise=this._isInitialized?Promise.resolve():this._initializationPromise;return _assert(promise,this,"internal-error"),promise.then(()=>cb(this.currentUser)),"function"==typeof nextOrObserver?subscription.addObserver(nextOrObserver,error,completed):subscription.addObserver(nextOrObserver)}async directlySetCurrentUser(user){this.currentUser&&this.currentUser!==user&&(this._currentUser._stopProactiveRefresh(),user&&this.isProactiveRefreshEnabled&&user._startProactiveRefresh()),this.currentUser=user,user?await this.assertedPersistence.setCurrentUser(user):await this.assertedPersistence.removeCurrentUser()}queue(action){return this.operations=this.operations.then(action,action),this.operations}get assertedPersistence(){return _assert(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(framework){framework&&!this.frameworks.includes(framework)&&(this.frameworks.push(framework),this.frameworks.sort(),this.clientVersion=_getClientVersion(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const headers={"X-Client-Version":this.clientVersion};return this.app.options.appId&&(headers["X-Firebase-gmpid"]=this.app.options.appId),headers}}function _castAuth(auth){return Object(index_esm2017.i)(auth)}class index_342f2197_Subscription{constructor(auth){this.auth=auth,this.observer=null,this.addObserver=Object(index_esm2017.f)(observer=>this.observer=observer)}get next(){return _assert(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class AuthCredential{constructor(providerId,signInMethod){this.providerId=providerId,this.signInMethod=signInMethod}toJSON(){return debugFail("not implemented")}_getIdTokenResponse(_auth){return debugFail("not implemented")}_linkToIdToken(_auth,_idToken){return debugFail("not implemented")}_getReauthenticationResolver(_auth){return debugFail("not implemented")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function updateEmailPassword(auth,request){return _performApiRequest(auth,"POST","/v1/accounts:update",request)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class EmailAuthCredential extends AuthCredential{constructor(_email,_password,signInMethod,_tenantId=null){super("password",signInMethod),this._email=_email,this._password=_password,this._tenantId=_tenantId}static _fromEmailAndPassword(email,password){return new EmailAuthCredential(email,password,"password")}static _fromEmailAndCode(email,oobCode,tenantId=null){return new EmailAuthCredential(email,oobCode,"emailLink",tenantId)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(json){const obj="string"==typeof json?JSON.parse(json):json;if((null===obj||void 0===obj?void 0:obj.email)&&(null===obj||void 0===obj?void 0:obj.password)){if("password"===obj.signInMethod)return this._fromEmailAndPassword(obj.email,obj.password);if("emailLink"===obj.signInMethod)return this._fromEmailAndCode(obj.email,obj.password,obj.tenantId)}return null}async _getIdTokenResponse(auth){switch(this.signInMethod){case"password":
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
return async function(auth,request){return _performSignInRequest(auth,"POST","/v1/accounts:signInWithPassword",_addTidIfNecessary(auth,request))}(auth,{returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
return async function(auth,request){return _performSignInRequest(auth,"POST","/v1/accounts:signInWithEmailLink",_addTidIfNecessary(auth,request))}(auth,{email:this._email,oobCode:this._password});default:_fail(auth,"internal-error")}}async _linkToIdToken(auth,idToken){switch(this.signInMethod){case"password":return updateEmailPassword(auth,{idToken:idToken,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return async function(auth,request){return _performSignInRequest(auth,"POST","/v1/accounts:signInWithEmailLink",_addTidIfNecessary(auth,request))}(auth,{idToken:idToken,email:this._email,oobCode:this._password});default:_fail(auth,"internal-error")}}_getReauthenticationResolver(auth){return this._getIdTokenResponse(auth)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function signInWithIdp(auth,request){return _performSignInRequest(auth,"POST","/v1/accounts:signInWithIdp",_addTidIfNecessary(auth,request))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IDP_REQUEST_URI$1="http://localhost";class index_342f2197_OAuthCredential extends AuthCredential{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(params){const cred=new index_342f2197_OAuthCredential(params.providerId,params.signInMethod);return params.idToken||params.accessToken?(params.idToken&&(cred.idToken=params.idToken),params.accessToken&&(cred.accessToken=params.accessToken),params.nonce&&!params.pendingToken&&(cred.nonce=params.nonce),params.pendingToken&&(cred.pendingToken=params.pendingToken)):params.oauthToken&&params.oauthTokenSecret?(cred.accessToken=params.oauthToken,cred.secret=params.oauthTokenSecret):_fail("argument-error"),cred}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(json){const obj="string"==typeof json?JSON.parse(json):json,{providerId:providerId,signInMethod:signInMethod}=obj,rest=Object(tslib_es6.c)(obj,["providerId","signInMethod"]);if(!providerId||!signInMethod)return null;const cred=new index_342f2197_OAuthCredential(providerId,signInMethod);return cred.idToken=rest.idToken||void 0,cred.accessToken=rest.accessToken||void 0,cred.secret=rest.secret,cred.nonce=rest.nonce,cred.pendingToken=rest.pendingToken||null,cred}_getIdTokenResponse(auth){return signInWithIdp(auth,this.buildRequest())}_linkToIdToken(auth,idToken){const request=this.buildRequest();return request.idToken=idToken,signInWithIdp(auth,request)}_getReauthenticationResolver(auth){const request=this.buildRequest();return request.autoCreate=!1,signInWithIdp(auth,request)}buildRequest(){const request={requestUri:IDP_REQUEST_URI$1,returnSecureToken:!0};if(this.pendingToken)request.pendingToken=this.pendingToken;else{const postBody={};this.idToken&&(postBody.id_token=this.idToken),this.accessToken&&(postBody.access_token=this.accessToken),this.secret&&(postBody.oauth_token_secret=this.secret),postBody.providerId=this.providerId,this.nonce&&!this.pendingToken&&(postBody.nonce=this.nonce),request.postBody=Object(index_esm2017.p)(postBody)}return request}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VERIFY_PHONE_NUMBER_FOR_EXISTING_ERROR_MAP_={USER_NOT_FOUND:"user-not-found"};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class PhoneAuthCredential extends AuthCredential{constructor(params){super("phone","phone"),this.params=params}static _fromVerification(verificationId,verificationCode){return new PhoneAuthCredential({verificationId:verificationId,verificationCode:verificationCode})}static _fromTokenResponse(phoneNumber,temporaryProof){return new PhoneAuthCredential({phoneNumber:phoneNumber,temporaryProof:temporaryProof})}_getIdTokenResponse(auth){return async function(auth,request){return _performSignInRequest(auth,"POST","/v1/accounts:signInWithPhoneNumber",_addTidIfNecessary(auth,request))}(auth,this._makeVerificationRequest())}_linkToIdToken(auth,idToken){return async function(auth,request){const response=await _performSignInRequest(auth,"POST","/v1/accounts:signInWithPhoneNumber",_addTidIfNecessary(auth,request));if(response.temporaryProof)throw _makeTaggedError(auth,"account-exists-with-different-credential",response);return response}(auth,Object.assign({idToken:idToken},this._makeVerificationRequest()))}_getReauthenticationResolver(auth){return async function(auth,request){return _performSignInRequest(auth,"POST","/v1/accounts:signInWithPhoneNumber",_addTidIfNecessary(auth,Object.assign(Object.assign({},request),{operation:"REAUTH"})),VERIFY_PHONE_NUMBER_FOR_EXISTING_ERROR_MAP_)}(auth,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:temporaryProof,phoneNumber:phoneNumber,verificationId:verificationId,verificationCode:verificationCode}=this.params;return temporaryProof&&phoneNumber?{temporaryProof:temporaryProof,phoneNumber:phoneNumber}:{sessionInfo:verificationId,code:verificationCode}}toJSON(){const obj={providerId:this.providerId};return this.params.phoneNumber&&(obj.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(obj.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(obj.verificationCode=this.params.verificationCode),this.params.verificationId&&(obj.verificationId=this.params.verificationId),obj}static fromJSON(json){"string"==typeof json&&(json=JSON.parse(json));const{verificationId:verificationId,verificationCode:verificationCode,phoneNumber:phoneNumber,temporaryProof:temporaryProof}=json;return verificationCode||verificationId||phoneNumber||temporaryProof?new PhoneAuthCredential({verificationId:verificationId,verificationCode:verificationCode,phoneNumber:phoneNumber,temporaryProof:temporaryProof}):null}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class index_342f2197_ActionCodeURL{constructor(actionLink){var _a,_b,_c,_d,_e,_f;const searchParams=Object(index_esm2017.q)(Object(index_esm2017.h)(actionLink)),apiKey=null!==(_a=searchParams.apiKey)&&void 0!==_a?_a:null,code=null!==(_b=searchParams.oobCode)&&void 0!==_b?_b:null,operation=function(mode){switch(mode){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}(null!==(_c=searchParams.mode)&&void 0!==_c?_c:null);_assert(apiKey&&code&&operation,"argument-error"),this.apiKey=apiKey,this.operation=operation,this.code=code,this.continueUrl=null!==(_d=searchParams.continueUrl)&&void 0!==_d?_d:null,this.languageCode=null!==(_e=searchParams.languageCode)&&void 0!==_e?_e:null,this.tenantId=null!==(_f=searchParams.tenantId)&&void 0!==_f?_f:null}static parseLink(link){const actionLink=function(url){const link=Object(index_esm2017.q)(Object(index_esm2017.h)(url)).link,doubleDeepLink=link?Object(index_esm2017.q)(Object(index_esm2017.h)(link)).deep_link_id:null,iOSDeepLink=Object(index_esm2017.q)(Object(index_esm2017.h)(url)).deep_link_id;return(iOSDeepLink?Object(index_esm2017.q)(Object(index_esm2017.h)(iOSDeepLink)).link:null)||iOSDeepLink||doubleDeepLink||link||url}(link);try{return new index_342f2197_ActionCodeURL(actionLink)}catch(_a){return null}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class EmailAuthProvider{constructor(){this.providerId=EmailAuthProvider.PROVIDER_ID}static credential(email,password){return EmailAuthCredential._fromEmailAndPassword(email,password)}static credentialWithLink(email,emailLink){const actionCodeUrl=index_342f2197_ActionCodeURL.parseLink(emailLink);return _assert(actionCodeUrl,"argument-error"),EmailAuthCredential._fromEmailAndCode(email,actionCodeUrl.code,actionCodeUrl.tenantId)}}EmailAuthProvider.PROVIDER_ID="password",EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD="password",EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD="emailLink";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class FederatedAuthProvider{constructor(providerId){this.providerId=providerId,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(languageCode){this.defaultLanguageCode=languageCode}setCustomParameters(customOAuthParameters){return this.customParameters=customOAuthParameters,this}getCustomParameters(){return this.customParameters}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BaseOAuthProvider extends FederatedAuthProvider{constructor(){super(...arguments),this.scopes=[]}addScope(scope){return this.scopes.includes(scope)||this.scopes.push(scope),this}getScopes(){return[...this.scopes]}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class FacebookAuthProvider extends BaseOAuthProvider{constructor(){super("facebook.com")}static credential(accessToken){return index_342f2197_OAuthCredential._fromParams({providerId:FacebookAuthProvider.PROVIDER_ID,signInMethod:FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD,accessToken:accessToken})}static credentialFromResult(userCredential){return FacebookAuthProvider.credentialFromTaggedObject(userCredential)}static credentialFromError(error){return FacebookAuthProvider.credentialFromTaggedObject(error.customData||{})}static credentialFromTaggedObject({_tokenResponse:tokenResponse}){if(!(tokenResponse&&"oauthAccessToken"in tokenResponse))return null;if(!tokenResponse.oauthAccessToken)return null;try{return FacebookAuthProvider.credential(tokenResponse.oauthAccessToken)}catch(_a){return null}}}FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD="facebook.com",FacebookAuthProvider.PROVIDER_ID="facebook.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class GoogleAuthProvider extends BaseOAuthProvider{constructor(){super("google.com"),this.addScope("profile")}static credential(idToken,accessToken){return index_342f2197_OAuthCredential._fromParams({providerId:GoogleAuthProvider.PROVIDER_ID,signInMethod:GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD,idToken:idToken,accessToken:accessToken})}static credentialFromResult(userCredential){return GoogleAuthProvider.credentialFromTaggedObject(userCredential)}static credentialFromError(error){return GoogleAuthProvider.credentialFromTaggedObject(error.customData||{})}static credentialFromTaggedObject({_tokenResponse:tokenResponse}){if(!tokenResponse)return null;const{oauthIdToken:oauthIdToken,oauthAccessToken:oauthAccessToken}=tokenResponse;if(!oauthIdToken&&!oauthAccessToken)return null;try{return GoogleAuthProvider.credential(oauthIdToken,oauthAccessToken)}catch(_a){return null}}}GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD="google.com",GoogleAuthProvider.PROVIDER_ID="google.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class GithubAuthProvider extends BaseOAuthProvider{constructor(){super("github.com")}static credential(accessToken){return index_342f2197_OAuthCredential._fromParams({providerId:GithubAuthProvider.PROVIDER_ID,signInMethod:GithubAuthProvider.GITHUB_SIGN_IN_METHOD,accessToken:accessToken})}static credentialFromResult(userCredential){return GithubAuthProvider.credentialFromTaggedObject(userCredential)}static credentialFromError(error){return GithubAuthProvider.credentialFromTaggedObject(error.customData||{})}static credentialFromTaggedObject({_tokenResponse:tokenResponse}){if(!(tokenResponse&&"oauthAccessToken"in tokenResponse))return null;if(!tokenResponse.oauthAccessToken)return null;try{return GithubAuthProvider.credential(tokenResponse.oauthAccessToken)}catch(_a){return null}}}GithubAuthProvider.GITHUB_SIGN_IN_METHOD="github.com",GithubAuthProvider.PROVIDER_ID="github.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class TwitterAuthProvider extends BaseOAuthProvider{constructor(){super("twitter.com")}static credential(token,secret){return index_342f2197_OAuthCredential._fromParams({providerId:TwitterAuthProvider.PROVIDER_ID,signInMethod:TwitterAuthProvider.TWITTER_SIGN_IN_METHOD,oauthToken:token,oauthTokenSecret:secret})}static credentialFromResult(userCredential){return TwitterAuthProvider.credentialFromTaggedObject(userCredential)}static credentialFromError(error){return TwitterAuthProvider.credentialFromTaggedObject(error.customData||{})}static credentialFromTaggedObject({_tokenResponse:tokenResponse}){if(!tokenResponse)return null;const{oauthAccessToken:oauthAccessToken,oauthTokenSecret:oauthTokenSecret}=tokenResponse;if(!oauthAccessToken||!oauthTokenSecret)return null;try{return TwitterAuthProvider.credential(oauthAccessToken,oauthTokenSecret)}catch(_a){return null}}}TwitterAuthProvider.TWITTER_SIGN_IN_METHOD="twitter.com",TwitterAuthProvider.PROVIDER_ID="twitter.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class UserCredentialImpl{constructor(params){this.user=params.user,this.providerId=params.providerId,this._tokenResponse=params._tokenResponse,this.operationType=params.operationType}static async _fromIdTokenResponse(auth,operationType,idTokenResponse,isAnonymous=!1){const user=await index_342f2197_UserImpl._fromIdTokenResponse(auth,idTokenResponse,isAnonymous),providerId=providerIdForResponse(idTokenResponse);return new UserCredentialImpl({user:user,providerId:providerId,_tokenResponse:idTokenResponse,operationType:operationType})}static async _forOperation(user,operationType,response){await user._updateTokensIfNecessary(response,!0);const providerId=providerIdForResponse(response);return new UserCredentialImpl({user:user,providerId:providerId,_tokenResponse:response,operationType:operationType})}}function providerIdForResponse(response){return response.providerId?response.providerId:"phoneNumber"in response?"phone":null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class index_342f2197_MultiFactorError extends index_esm2017.c{constructor(auth,error,operationType,user){var _a;super(error.code,error.message),this.operationType=operationType,this.user=user,Object.setPrototypeOf(this,index_342f2197_MultiFactorError.prototype),this.customData={appName:auth.name,tenantId:null!==(_a=auth.tenantId)&&void 0!==_a?_a:void 0,_serverResponse:error.customData._serverResponse,operationType:operationType}}static _fromErrorAndOperation(auth,error,operationType,user){return new index_342f2197_MultiFactorError(auth,error,operationType,user)}}function _processCredentialSavingMfaContextIfNecessary(auth,operationType,credential,user){return("reauthenticate"===operationType?credential._getReauthenticationResolver(auth):credential._getIdTokenResponse(auth)).catch(error=>{if("auth/multi-factor-auth-required"===error.code)throw index_342f2197_MultiFactorError._fromErrorAndOperation(auth,error,operationType,user);throw error})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _link$1(user,credential,bypassAuthState=!1){const response=await _logoutIfInvalidated(user,credential._linkToIdToken(user.auth,await user.getIdToken()),bypassAuthState);return UserCredentialImpl._forOperation(user,"link",response)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function _reauthenticate(user,credential,bypassAuthState=!1){const{auth:auth}=user;try{const response=await _logoutIfInvalidated(user,_processCredentialSavingMfaContextIfNecessary(auth,"reauthenticate",credential,user),bypassAuthState);_assert(response.idToken,auth,"internal-error");const parsed=_parseToken(response.idToken);_assert(parsed,auth,"internal-error");const{sub:localId}=parsed;return _assert(user.uid===localId,auth,"user-mismatch"),UserCredentialImpl._forOperation(user,"reauthenticate",response)}catch(e){throw"auth/user-not-found"===(null===e||void 0===e?void 0:e.code)&&_fail(auth,"user-mismatch"),e}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _signInWithCredential(auth,credential,bypassAuthState=!1){const response=await _processCredentialSavingMfaContextIfNecessary(auth,"signIn",credential),userCredential=await UserCredentialImpl._fromIdTokenResponse(auth,"signIn",response);return bypassAuthState||await auth._updateCurrentUser(userCredential.user),userCredential}new WeakMap;const STORAGE_AVAILABLE_KEY="__sak";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BrowserPersistenceClass{constructor(storageRetriever,type){this.storageRetriever=storageRetriever,this.type=type}_isAvailable(){try{return this.storage?(this.storage.setItem(STORAGE_AVAILABLE_KEY,"1"),this.storage.removeItem(STORAGE_AVAILABLE_KEY),Promise.resolve(!0)):Promise.resolve(!1)}catch(_a){return Promise.resolve(!1)}}_set(key,value){return this.storage.setItem(key,JSON.stringify(value)),Promise.resolve()}_get(key){const json=this.storage.getItem(key);return Promise.resolve(json?JSON.parse(json):null)}_remove(key){return this.storage.removeItem(key),Promise.resolve()}get storage(){return this.storageRetriever()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _POLLING_INTERVAL_MS$1=1e3,IE10_LOCAL_STORAGE_SYNC_DELAY=10;class BrowserLocalPersistence extends BrowserPersistenceClass{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=((event,poll)=>this.onStorageEvent(event,poll)),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=function(){const ua=Object(index_esm2017.j)();return _isSafari(ua)||_isIOS(ua)}()&&function(){try{return!(!window||window===window.top)}catch(e){return!1}}(),this.fallbackToPolling=_isMobileBrowser(),this._shouldAllowMigration=!0}forAllChangedKeys(cb){for(const key of Object.keys(this.listeners)){const newValue=this.storage.getItem(key),oldValue=this.localCache[key];newValue!==oldValue&&cb(key,oldValue,newValue)}}onStorageEvent(event,poll=!1){if(!event.key)return void this.forAllChangedKeys((key,_oldValue,newValue)=>{this.notifyListeners(key,newValue)});const key=event.key;if(poll?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const storedValue=this.storage.getItem(key);if(event.newValue!==storedValue)null!==event.newValue?this.storage.setItem(key,event.newValue):this.storage.removeItem(key);else if(this.localCache[key]===event.newValue&&!poll)return}const triggerListeners=()=>{const storedValue=this.storage.getItem(key);(poll||this.localCache[key]!==storedValue)&&this.notifyListeners(key,storedValue)},storedValue=this.storage.getItem(key);Object(index_esm2017.m)()&&10===document.documentMode&&storedValue!==event.newValue&&event.newValue!==event.oldValue?setTimeout(triggerListeners,IE10_LOCAL_STORAGE_SYNC_DELAY):triggerListeners()}notifyListeners(key,value){this.localCache[key]=value;const listeners=this.listeners[key];if(listeners)for(const listener of Array.from(listeners))listener(value?JSON.parse(value):value)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((key,oldValue,newValue)=>{this.onStorageEvent(new StorageEvent("storage",{key:key,oldValue:oldValue,newValue:newValue}),!0)})},_POLLING_INTERVAL_MS$1)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(key,listener){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[key]||(this.listeners[key]=new Set,this.localCache[key]=this.storage.getItem(key)),this.listeners[key].add(listener)}_removeListener(key,listener){this.listeners[key]&&(this.listeners[key].delete(listener),0===this.listeners[key].size&&delete this.listeners[key]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(key,value){await super._set(key,value),this.localCache[key]=JSON.stringify(value)}async _get(key){const value=await super._get(key);return this.localCache[key]=JSON.stringify(value),value}async _remove(key){await super._remove(key),delete this.localCache[key]}}BrowserLocalPersistence.type="LOCAL";const browserLocalPersistence=BrowserLocalPersistence;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BrowserSessionPersistence extends BrowserPersistenceClass{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(_key,_listener){}_removeListener(_key,_listener){}}BrowserSessionPersistence.type="SESSION";const browserSessionPersistence=BrowserSessionPersistence;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Receiver{constructor(eventTarget){this.eventTarget=eventTarget,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(eventTarget){const existingInstance=this.receivers.find(receiver=>receiver.isListeningto(eventTarget));if(existingInstance)return existingInstance;const newInstance=new Receiver(eventTarget);return this.receivers.push(newInstance),newInstance}isListeningto(eventTarget){return this.eventTarget===eventTarget}async handleEvent(event){const messageEvent=event,{eventId:eventId,eventType:eventType,data:data}=messageEvent.data,handlers=this.handlersMap[eventType];if(!(null===handlers||void 0===handlers?void 0:handlers.size))return;messageEvent.ports[0].postMessage({status:"ack",eventId:eventId,eventType:eventType});const promises=Array.from(handlers).map(async handler=>handler(messageEvent.origin,data)),response=await function(promises){return Promise.all(promises.map(async promise=>{try{return{fulfilled:!0,value:await promise}}catch(reason){return{fulfilled:!1,reason:reason}}}))}(promises);messageEvent.ports[0].postMessage({status:"done",eventId:eventId,eventType:eventType,response:response})}_subscribe(eventType,eventHandler){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[eventType]||(this.handlersMap[eventType]=new Set),this.handlersMap[eventType].add(eventHandler)}_unsubscribe(eventType,eventHandler){this.handlersMap[eventType]&&eventHandler&&this.handlersMap[eventType].delete(eventHandler),eventHandler&&0!==this.handlersMap[eventType].size||delete this.handlersMap[eventType],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _generateEventId(prefix="",digits=10){let random="";for(let i=0;i<digits;i++)random+=Math.floor(10*Math.random());return prefix+random}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Receiver.receivers=[];class Sender{constructor(target){this.target=target,this.handlers=new Set}removeMessageHandler(handler){handler.messageChannel&&(handler.messageChannel.port1.removeEventListener("message",handler.onMessage),handler.messageChannel.port1.close()),this.handlers.delete(handler)}async _send(eventType,data,timeout=50){const messageChannel="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!messageChannel)throw new Error("connection_unavailable");let completionTimer,handler;return new Promise((resolve,reject)=>{const eventId=_generateEventId("",20);messageChannel.port1.start();const ackTimer=setTimeout(()=>{reject(new Error("unsupported_event"))},timeout);handler={messageChannel:messageChannel,onMessage(event){const messageEvent=event;if(messageEvent.data.eventId===eventId)switch(messageEvent.data.status){case"ack":clearTimeout(ackTimer),completionTimer=setTimeout(()=>{reject(new Error("timeout"))},3e3);break;case"done":clearTimeout(completionTimer),resolve(messageEvent.data.response);break;default:clearTimeout(ackTimer),clearTimeout(completionTimer),reject(new Error("invalid_response"))}}},this.handlers.add(handler),messageChannel.port1.addEventListener("message",handler.onMessage),this.target.postMessage({eventType:eventType,eventId:eventId,data:data},[messageChannel.port2])}).finally(()=>{handler&&this.removeMessageHandler(handler)})}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _window(){return window}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _isWorker(){return void 0!==_window().WorkerGlobalScope&&"function"==typeof _window().importScripts}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DB_NAME="firebaseLocalStorageDb",DB_VERSION=1,DB_OBJECTSTORE_NAME="firebaseLocalStorage",DB_DATA_KEYPATH="fbase_key";class DBPromise{constructor(request){this.request=request}toPromise(){return new Promise((resolve,reject)=>{this.request.addEventListener("success",()=>{resolve(this.request.result)}),this.request.addEventListener("error",()=>{reject(this.request.error)})})}}function getObjectStore(db,isReadWrite){return db.transaction([DB_OBJECTSTORE_NAME],isReadWrite?"readwrite":"readonly").objectStore(DB_OBJECTSTORE_NAME)}function _openDatabase(){const request=indexedDB.open(DB_NAME,DB_VERSION);return new Promise((resolve,reject)=>{request.addEventListener("error",()=>{reject(request.error)}),request.addEventListener("upgradeneeded",()=>{const db=request.result;try{db.createObjectStore(DB_OBJECTSTORE_NAME,{keyPath:DB_DATA_KEYPATH})}catch(e){reject(e)}}),request.addEventListener("success",async()=>{const db=request.result;db.objectStoreNames.contains(DB_OBJECTSTORE_NAME)?resolve(db):(db.close(),await function(){const request=indexedDB.deleteDatabase(DB_NAME);return new DBPromise(request).toPromise()}(),resolve(await _openDatabase()))})})}async function _putObject(db,key,value){const request=getObjectStore(db,!0).put({[DB_DATA_KEYPATH]:key,value:value});return new DBPromise(request).toPromise()}function _deleteObject(db,key){const request=getObjectStore(db,!0).delete(key);return new DBPromise(request).toPromise()}const _POLLING_INTERVAL_MS=800,_TRANSACTION_RETRY_COUNT=3;class IndexedDBLocalPersistence{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await _openDatabase(),this.db)}async _withRetries(op){let numAttempts=0;for(;;)try{const db=await this._openDb();return await op(db)}catch(e){if(numAttempts++>_TRANSACTION_RETRY_COUNT)throw e;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return _isWorker()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Receiver._getInstance(_isWorker()?self:null),this.receiver._subscribe("keyChanged",async(_origin,data)=>{return{keyProcessed:(await this._poll()).includes(data.key)}}),this.receiver._subscribe("ping",async(_origin,_data)=>["keyChanged"])}async initializeSender(){var _a,_b;if(this.activeServiceWorker=await async function(){if(!(null===navigator||void 0===navigator?void 0:navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch(_a){return null}}(),!this.activeServiceWorker)return;this.sender=new Sender(this.activeServiceWorker);const results=await this.sender._send("ping",{},800);results&&(null===(_a=results[0])||void 0===_a?void 0:_a.fulfilled)&&(null===(_b=results[0])||void 0===_b?void 0:_b.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(key){if(this.sender&&this.activeServiceWorker&&function(){var _a;return(null===(_a=null===navigator||void 0===navigator?void 0:navigator.serviceWorker)||void 0===_a?void 0:_a.controller)||null}()===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:key},this.serviceWorkerReceiverAvailable?800:50)}catch(_a){}}async _isAvailable(){try{if(!indexedDB)return!1;const db=await _openDatabase();return await _putObject(db,STORAGE_AVAILABLE_KEY,"1"),await _deleteObject(db,STORAGE_AVAILABLE_KEY),!0}catch(_a){}return!1}async _withPendingWrite(write){this.pendingWrites++;try{await write()}finally{this.pendingWrites--}}async _set(key,value){return this._withPendingWrite(async()=>(await this._withRetries(db=>_putObject(db,key,value)),this.localCache[key]=value,this.notifyServiceWorker(key)))}async _get(key){const obj=await this._withRetries(db=>(async function(db,key){const request=getObjectStore(db,!1).get(key),data=await new DBPromise(request).toPromise();return void 0===data?null:data.value})(db,key));return this.localCache[key]=obj,obj}async _remove(key){return this._withPendingWrite(async()=>(await this._withRetries(db=>_deleteObject(db,key)),delete this.localCache[key],this.notifyServiceWorker(key)))}async _poll(){const result=await this._withRetries(db=>{const getAllRequest=getObjectStore(db,!1).getAll();return new DBPromise(getAllRequest).toPromise()});if(!result)return[];if(0!==this.pendingWrites)return[];const keys=[],keysInResult=new Set;for(const{fbase_key:key,value:value}of result)keysInResult.add(key),JSON.stringify(this.localCache[key])!==JSON.stringify(value)&&(this.notifyListeners(key,value),keys.push(key));for(const localKey of Object.keys(this.localCache))this.localCache[localKey]&&!keysInResult.has(localKey)&&(this.notifyListeners(localKey,null),keys.push(localKey));return keys}notifyListeners(key,newValue){this.localCache[key]=newValue;const listeners=this.listeners[key];if(listeners)for(const listener of Array.from(listeners))listener(newValue)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),_POLLING_INTERVAL_MS)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(key,listener){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[key]||(this.listeners[key]=new Set,this._get(key)),this.listeners[key].add(listener)}_removeListener(key,listener){this.listeners[key]&&(this.listeners[key].delete(listener),0===this.listeners[key].size&&delete this.listeners[key]),0===Object.keys(this.listeners).length&&this.stopPolling()}}IndexedDBLocalPersistence.type="LOCAL";const indexedDBLocalPersistence=IndexedDBLocalPersistence;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _loadJS(url){return new Promise((resolve,reject)=>{const el=document.createElement("script");el.setAttribute("src",url),el.onload=resolve,el.onerror=(e=>{const error=_createError("internal-error");error.customData=e,reject(error)}),el.type="text/javascript",el.charset="UTF-8",
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(){var _a,_b;return null!==(_b=null===(_a=document.getElementsByTagName("head"))||void 0===_a?void 0:_a[0])&&void 0!==_b?_b:document}().appendChild(el)})}function _generateCallbackName(prefix){return`__${prefix}${Math.floor(1e6*Math.random())}`}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
_generateCallbackName("rcb"),new index_342f2197_Delay(3e4,6e4);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const RECAPTCHA_VERIFIER_TYPE="recaptcha";async function _verifyPhoneNumber(auth,options,verifier){var _a;const recaptchaToken=await verifier.verify();try{let phoneInfoOptions;if(_assert("string"==typeof recaptchaToken,auth,"argument-error"),_assert(verifier.type===RECAPTCHA_VERIFIER_TYPE,auth,"argument-error"),"session"in(phoneInfoOptions="string"==typeof options?{phoneNumber:options}:options)){const session=phoneInfoOptions.session;if("phoneNumber"in phoneInfoOptions){return _assert("enroll"===session.type,auth,"internal-error"),(await
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(auth,request){return _performApiRequest(auth,"POST","/v2/accounts/mfaEnrollment:start",_addTidIfNecessary(auth,request))}(auth,{idToken:session.credential,phoneEnrollmentInfo:{phoneNumber:phoneInfoOptions.phoneNumber,recaptchaToken:recaptchaToken}})).phoneSessionInfo.sessionInfo}{_assert("signin"===session.type,auth,"internal-error");const mfaEnrollmentId=(null===(_a=phoneInfoOptions.multiFactorHint)||void 0===_a?void 0:_a.uid)||phoneInfoOptions.multiFactorUid;return _assert(mfaEnrollmentId,auth,"missing-multi-factor-info"),(await function(auth,request){return _performApiRequest(auth,"POST","/v2/accounts/mfaSignIn:start",_addTidIfNecessary(auth,request))}(auth,{mfaPendingCredential:session.credential,mfaEnrollmentId:mfaEnrollmentId,phoneSignInInfo:{recaptchaToken:recaptchaToken}})).phoneResponseInfo.sessionInfo}}{const{sessionInfo:sessionInfo}=await async function(auth,request){return _performApiRequest(auth,"POST","/v1/accounts:sendVerificationCode",_addTidIfNecessary(auth,request))}(auth,{phoneNumber:phoneInfoOptions.phoneNumber,recaptchaToken:recaptchaToken});return sessionInfo}}finally{verifier._reset()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class index_342f2197_PhoneAuthProvider{constructor(auth){this.providerId=index_342f2197_PhoneAuthProvider.PROVIDER_ID,this.auth=_castAuth(auth)}verifyPhoneNumber(phoneOptions,applicationVerifier){return _verifyPhoneNumber(this.auth,phoneOptions,Object(index_esm2017.i)(applicationVerifier))}static credential(verificationId,verificationCode){return PhoneAuthCredential._fromVerification(verificationId,verificationCode)}static credentialFromResult(userCredential){const credential=userCredential;return index_342f2197_PhoneAuthProvider.credentialFromTaggedObject(credential)}static credentialFromError(error){return index_342f2197_PhoneAuthProvider.credentialFromTaggedObject(error.customData||{})}static credentialFromTaggedObject({_tokenResponse:tokenResponse}){if(!tokenResponse)return null;const{phoneNumber:phoneNumber,temporaryProof:temporaryProof}=tokenResponse;return phoneNumber&&temporaryProof?PhoneAuthCredential._fromTokenResponse(phoneNumber,temporaryProof):null}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _withDefaultResolver(auth,resolverOverride){return resolverOverride?_getInstance(resolverOverride):(_assert(auth._popupRedirectResolver,auth,"argument-error"),auth._popupRedirectResolver)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */index_342f2197_PhoneAuthProvider.PROVIDER_ID="phone",index_342f2197_PhoneAuthProvider.PHONE_SIGN_IN_METHOD="phone";class IdpCredential extends AuthCredential{constructor(params){super("custom","custom"),this.params=params}_getIdTokenResponse(auth){return signInWithIdp(auth,this._buildIdpRequest())}_linkToIdToken(auth,idToken){return signInWithIdp(auth,this._buildIdpRequest(idToken))}_getReauthenticationResolver(auth){return signInWithIdp(auth,this._buildIdpRequest())}_buildIdpRequest(idToken){const request={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return idToken&&(request.idToken=idToken),request}}function _signIn(params){return _signInWithCredential(params.auth,new IdpCredential(params),params.bypassAuthState)}function _reauth(params){const{auth:auth,user:user}=params;return _assert(user,auth,"internal-error"),_reauthenticate(user,new IdpCredential(params),params.bypassAuthState)}async function _link(params){const{auth:auth,user:user}=params;return _assert(user,auth,"internal-error"),_link$1(user,new IdpCredential(params),params.bypassAuthState)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AbstractPopupRedirectOperation{constructor(auth,filter,resolver,user,bypassAuthState=!1){this.auth=auth,this.resolver=resolver,this.user=user,this.bypassAuthState=bypassAuthState,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(filter)?filter:[filter]}execute(){return new Promise(async(resolve,reject)=>{this.pendingPromise={resolve:resolve,reject:reject};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(e){this.reject(e)}})}async onAuthEvent(event){const{urlResponse:urlResponse,sessionId:sessionId,postBody:postBody,tenantId:tenantId,error:error,type:type}=event;if(error)return void this.reject(error);const params={auth:this.auth,requestUri:urlResponse,sessionId:sessionId,tenantId:tenantId||void 0,postBody:postBody||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(type)(params))}catch(e){this.reject(e)}}onError(error){this.reject(error)}getIdpTask(type){switch(type){case"signInViaPopup":case"signInViaRedirect":return _signIn;case"linkViaPopup":case"linkViaRedirect":return _link;case"reauthViaPopup":case"reauthViaRedirect":return _reauth;default:_fail(this.auth,"internal-error")}}resolve(cred){debugAssert(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(cred),this.unregisterAndCleanUp()}reject(error){debugAssert(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(error),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _POLL_WINDOW_CLOSE_TIMEOUT=new index_342f2197_Delay(2e3,1e4);async function signInWithPopup(auth,provider,resolver){const authInternal=_castAuth(auth);_assertInstanceOf(auth,provider,FederatedAuthProvider);const resolverInternal=_withDefaultResolver(authInternal,resolver);return new PopupOperation(authInternal,"signInViaPopup",provider,resolverInternal).executeNotNull()}class PopupOperation extends AbstractPopupRedirectOperation{constructor(auth,filter,provider,resolver,user){super(auth,filter,resolver,user),this.provider=provider,this.authWindow=null,this.pollId=null,PopupOperation.currentPopupAction&&PopupOperation.currentPopupAction.cancel(),PopupOperation.currentPopupAction=this}async executeNotNull(){const result=await this.execute();return _assert(result,this.auth,"internal-error"),result}async onExecution(){debugAssert(1===this.filter.length,"Popup operations only handle one event");const eventId=_generateEventId();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],eventId),this.authWindow.associatedEvent=eventId,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,isSupported=>{isSupported||this.reject(_createError(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var _a;return(null===(_a=this.authWindow)||void 0===_a?void 0:_a.associatedEvent)||null}cancel(){this.reject(_createError(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,PopupOperation.currentPopupAction=null}pollUserCancellation(){const poll=()=>{var _a,_b;null!==(_b=null===(_a=this.authWindow)||void 0===_a?void 0:_a.window)&&void 0!==_b&&_b.closed?this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(_createError(this.auth,"popup-closed-by-user"))},2e3):this.pollId=window.setTimeout(poll,_POLL_WINDOW_CLOSE_TIMEOUT.get())};poll()}}PopupOperation.currentPopupAction=null;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const PENDING_REDIRECT_KEY="pendingRedirect",redirectOutcomeMap=new Map;class RedirectAction extends AbstractPopupRedirectOperation{constructor(auth,resolver,bypassAuthState=!1){super(auth,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],resolver,void 0,bypassAuthState),this.eventId=null}async execute(){let readyOutcome=redirectOutcomeMap.get(this.auth._key());if(!readyOutcome){try{const result=await async function(resolver,auth){const key=pendingRedirectKey(auth),persistence=resolverPersistence(resolver);if(!await persistence._isAvailable())return!1;const hasPendingRedirect="true"===await persistence._get(key);return await persistence._remove(key),hasPendingRedirect}(this.resolver,this.auth)?await super.execute():null;readyOutcome=(()=>Promise.resolve(result))}catch(e){readyOutcome=(()=>Promise.reject(e))}redirectOutcomeMap.set(this.auth._key(),readyOutcome)}return this.bypassAuthState||redirectOutcomeMap.set(this.auth._key(),()=>Promise.resolve(null)),readyOutcome()}async onAuthEvent(event){if("signInViaRedirect"===event.type)return super.onAuthEvent(event);if("unknown"!==event.type){if(event.eventId){const user=await this.auth._redirectUserForId(event.eventId);if(user)return this.user=user,super.onAuthEvent(event);this.resolve(null)}}else this.resolve(null)}async onExecution(){}cleanUp(){}}function resolverPersistence(resolver){return _getInstance(resolver._redirectPersistence)}function pendingRedirectKey(auth){return _persistenceKeyName(PENDING_REDIRECT_KEY,auth.config.apiKey,auth.name)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _getRedirectResult(auth,resolverExtern,bypassAuthState=!1){const authInternal=_castAuth(auth),resolver=_withDefaultResolver(authInternal,resolverExtern),action=new RedirectAction(authInternal,resolver,bypassAuthState),result=await action.execute();return result&&!bypassAuthState&&(delete result.user._redirectEventId,await authInternal._persistUserIfCurrent(result.user),await authInternal._setRedirectUser(null,resolverExtern)),result}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const EVENT_DUPLICATION_CACHE_DURATION_MS=6e5;class AuthEventManager{constructor(auth){this.auth=auth,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(authEventConsumer){this.consumers.add(authEventConsumer),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,authEventConsumer)&&(this.sendToConsumer(this.queuedRedirectEvent,authEventConsumer),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(authEventConsumer){this.consumers.delete(authEventConsumer)}onEvent(event){if(this.hasEventBeenHandled(event))return!1;let handled=!1;return this.consumers.forEach(consumer=>{this.isEventForConsumer(event,consumer)&&(handled=!0,this.sendToConsumer(event,consumer),this.saveEventToCache(event))}),this.hasHandledPotentialRedirect||!function(event){switch(event.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return isNullRedirectEvent(event);default:return!1}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(event)?handled:(this.hasHandledPotentialRedirect=!0,handled||(this.queuedRedirectEvent=event,handled=!0),handled)}sendToConsumer(event,consumer){var _a;if(event.error&&!isNullRedirectEvent(event)){const code=(null===(_a=event.error.code)||void 0===_a?void 0:_a.split("auth/")[1])||"internal-error";consumer.onError(_createError(this.auth,code))}else consumer.onAuthEvent(event)}isEventForConsumer(event,consumer){const eventIdMatches=null===consumer.eventId||!!event.eventId&&event.eventId===consumer.eventId;return consumer.filter.includes(event.type)&&eventIdMatches}hasEventBeenHandled(event){return Date.now()-this.lastProcessedEventTime>=EVENT_DUPLICATION_CACHE_DURATION_MS&&this.cachedEventUids.clear(),this.cachedEventUids.has(eventUid(event))}saveEventToCache(event){this.cachedEventUids.add(eventUid(event)),this.lastProcessedEventTime=Date.now()}}function eventUid(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(v=>v).join("-")}function isNullRedirectEvent({type:type,error:error}){return"unknown"===type&&"auth/no-auth-event"===(null===error||void 0===error?void 0:error.code)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const IP_ADDRESS_REGEX=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,HTTP_REGEX=/^https?/;async function _validateOrigin(auth){if(auth.config.emulator)return;const{authorizedDomains:authorizedDomains}=await async function(auth,request={}){return _performApiRequest(auth,"GET","/v1/projects",request)}(auth);for(const domain of authorizedDomains)try{if(matchDomain(domain))return}catch(_a){}_fail(auth,"unauthorized-domain")}function matchDomain(expected){const currentUrl=_getCurrentUrl(),{protocol:protocol,hostname:hostname}=new URL(currentUrl);if(expected.startsWith("chrome-extension://")){const ceUrl=new URL(expected);return""===ceUrl.hostname&&""===hostname?"chrome-extension:"===protocol&&expected.replace("chrome-extension://","")===currentUrl.replace("chrome-extension://",""):"chrome-extension:"===protocol&&ceUrl.hostname===hostname}if(!HTTP_REGEX.test(protocol))return!1;if(IP_ADDRESS_REGEX.test(expected))return hostname===expected;const escapedDomainPattern=expected.replace(/\./g,"\\.");return new RegExp("^(.+\\."+escapedDomainPattern+"|"+escapedDomainPattern+")$","i").test(hostname)}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NETWORK_TIMEOUT=new index_342f2197_Delay(3e4,6e4);function resetUnloadedGapiModules(){const beacon=_window().___jsl;if(null===beacon||void 0===beacon?void 0:beacon.H)for(const hint of Object.keys(beacon.H))if(beacon.H[hint].r=beacon.H[hint].r||[],beacon.H[hint].L=beacon.H[hint].L||[],beacon.H[hint].r=[...beacon.H[hint].L],beacon.CP)for(let i=0;i<beacon.CP.length;i++)beacon.CP[i]=null}let cachedGApiLoader=null;function _loadGapi(auth){return cachedGApiLoader=cachedGApiLoader||function(auth){return new Promise((resolve,reject)=>{var _a,_b,_c;function loadGapiIframe(){resetUnloadedGapiModules(),gapi.load("gapi.iframes",{callback:()=>{resolve(gapi.iframes.getContext())},ontimeout:()=>{resetUnloadedGapiModules(),reject(_createError(auth,"network-request-failed"))},timeout:NETWORK_TIMEOUT.get()})}if(null===(_b=null===(_a=_window().gapi)||void 0===_a?void 0:_a.iframes)||void 0===_b?void 0:_b.Iframe)resolve(gapi.iframes.getContext());else{if(null===(_c=_window().gapi)||void 0===_c||!_c.load){const cbName=_generateCallbackName("iframefcb");return _window()[cbName]=(()=>{gapi.load?loadGapiIframe():reject(_createError(auth,"network-request-failed"))}),_loadJS(`https://apis.google.com/js/api.js?onload=${cbName}`).catch(e=>reject(e))}loadGapiIframe()}}).catch(error=>{throw cachedGApiLoader=null,error})}(auth)}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PING_TIMEOUT=new index_342f2197_Delay(5e3,15e3),IFRAME_PATH="__/auth/iframe",EMULATED_IFRAME_PATH="emulator/auth/iframe",IFRAME_ATTRIBUTES={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},EID_FROM_APIHOST=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);async function _openIframe(auth){const context=await _loadGapi(auth),gapi=_window().gapi;return _assert(gapi,auth,"internal-error"),context.open({where:document.body,url:function(auth){const config=auth.config;_assert(config.authDomain,auth,"auth-domain-config-required");const url=config.emulator?_emulatorUrl(config,EMULATED_IFRAME_PATH):`https://${auth.config.authDomain}/${IFRAME_PATH}`,params={apiKey:config.apiKey,appName:auth.name,v:esm_index_esm2017.a},eid=EID_FROM_APIHOST.get(auth.config.apiHost);eid&&(params.eid=eid);const frameworks=auth._getFrameworks();return frameworks.length&&(params.fw=frameworks.join(",")),`${url}?${Object(index_esm2017.p)(params).slice(1)}`}(auth),messageHandlersFilter:gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:IFRAME_ATTRIBUTES,dontclear:!0},iframe=>new Promise(async(resolve,reject)=>{await iframe.restyle({setHideOnLeave:!1});const networkError=_createError(auth,"network-request-failed"),networkErrorTimer=_window().setTimeout(()=>{reject(networkError)},PING_TIMEOUT.get());function clearTimerAndResolve(){_window().clearTimeout(networkErrorTimer),resolve(iframe)}iframe.ping(clearTimerAndResolve).then(clearTimerAndResolve,()=>{reject(networkError)})}))}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BASE_POPUP_OPTIONS={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},DEFAULT_WIDTH=500,DEFAULT_HEIGHT=600,TARGET_BLANK="_blank",FIREFOX_EMPTY_URL="http://localhost";class AuthPopup{constructor(window){this.window=window,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}function _open(auth,url,name,width=DEFAULT_WIDTH,height=DEFAULT_HEIGHT){const top=Math.max((window.screen.availHeight-height)/2,0).toString(),left=Math.max((window.screen.availWidth-width)/2,0).toString();let target="";const options=Object.assign(Object.assign({},BASE_POPUP_OPTIONS),{width:width.toString(),height:height.toString(),top:top,left:left}),ua=Object(index_esm2017.j)().toLowerCase();name&&(target=_isChromeIOS(ua)?TARGET_BLANK:name),_isFirefox(ua)&&(url=url||FIREFOX_EMPTY_URL,options.scrollbars="yes");const optionsString=Object.entries(options).reduce((accum,[key,value])=>`${accum}${key}=${value},`,"");if(function(ua=Object(index_esm2017.j)()){var _a;return _isIOS(ua)&&!!(null===(_a=window.navigator)||void 0===_a?void 0:_a.standalone)}(ua)&&"_self"!==target)return function(url,target){const el=document.createElement("a");el.href=url,el.target=target;const click=document.createEvent("MouseEvent");click.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),el.dispatchEvent(click)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(url||"",target),new AuthPopup(null);const newWin=window.open(url||"",target,optionsString);_assert(newWin,auth,"popup-blocked");try{newWin.focus()}catch(e){}return new AuthPopup(newWin)}const WIDGET_PATH="__/auth/handler",EMULATOR_WIDGET_PATH="emulator/auth/handler";function _getRedirectUrl(auth,provider,authType,redirectUrl,eventId,additionalParams){_assert(auth.config.authDomain,auth,"auth-domain-config-required"),_assert(auth.config.apiKey,auth,"invalid-api-key");const params={apiKey:auth.config.apiKey,appName:auth.name,authType:authType,redirectUrl:redirectUrl,v:esm_index_esm2017.a,eventId:eventId};if(provider instanceof FederatedAuthProvider){provider.setDefaultLanguage(auth.languageCode),params.providerId=provider.providerId||"",Object(index_esm2017.l)(provider.getCustomParameters())||(params.customParameters=JSON.stringify(provider.getCustomParameters()));for(const[key,value]of Object.entries(additionalParams||{}))params[key]=value}if(provider instanceof BaseOAuthProvider){const scopes=provider.getScopes().filter(scope=>""!==scope);scopes.length>0&&(params.scopes=scopes.join(","))}auth.tenantId&&(params.tid=auth.tenantId);const paramsDict=params;for(const key of Object.keys(paramsDict))void 0===paramsDict[key]&&delete paramsDict[key];return`${function({config:config}){if(!config.emulator)return`https://${config.authDomain}/${WIDGET_PATH}`;return _emulatorUrl(config,EMULATOR_WIDGET_PATH)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(auth)}?${Object(index_esm2017.p)(paramsDict).slice(1)}`}const WEB_STORAGE_SUPPORT_KEY="webStorageSupport";const browserPopupRedirectResolver=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=browserSessionPersistence,this._completeRedirectFn=_getRedirectResult}async _openPopup(auth,provider,authType,eventId){var _a;return debugAssert(null===(_a=this.eventManagers[auth._key()])||void 0===_a?void 0:_a.manager,"_initialize() not called before _openPopup()"),_open(auth,_getRedirectUrl(auth,provider,authType,_getCurrentUrl(),eventId),_generateEventId())}async _openRedirect(auth,provider,authType,eventId){return await this._originValidation(auth),function(url){_window().location.href=url}(_getRedirectUrl(auth,provider,authType,_getCurrentUrl(),eventId)),new Promise(()=>{})}_initialize(auth){const key=auth._key();if(this.eventManagers[key]){const{manager:manager,promise:promise}=this.eventManagers[key];return manager?Promise.resolve(manager):(debugAssert(promise,"If manager is not set, promise should be"),promise)}const promise=this.initAndGetManager(auth);return this.eventManagers[key]={promise:promise},promise.catch(()=>{delete this.eventManagers[key]}),promise}async initAndGetManager(auth){const iframe=await _openIframe(auth),manager=new AuthEventManager(auth);return iframe.register("authEvent",iframeEvent=>(_assert(null===iframeEvent||void 0===iframeEvent?void 0:iframeEvent.authEvent,auth,"invalid-auth-event"),{status:manager.onEvent(iframeEvent.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[auth._key()]={manager:manager},this.iframes[auth._key()]=iframe,manager}_isIframeWebStorageSupported(auth,cb){this.iframes[auth._key()].send(WEB_STORAGE_SUPPORT_KEY,{type:WEB_STORAGE_SUPPORT_KEY},result=>{var _a;const isSupported=null===(_a=null===result||void 0===result?void 0:result[0])||void 0===_a?void 0:_a[WEB_STORAGE_SUPPORT_KEY];void 0!==isSupported&&cb(!!isSupported),_fail(auth,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(auth){const key=auth._key();return this.originValidationPromises[key]||(this.originValidationPromises[key]=_validateOrigin(auth)),this.originValidationPromises[key]}get _shouldInitProactively(){return _isMobileBrowser()||_isSafari()||_isIOS()}};class MultiFactorAssertionImpl{constructor(factorId){this.factorId=factorId}_process(auth,session,displayName){switch(session.type){case"enroll":return this._finalizeEnroll(auth,session.credential,displayName);case"signin":return this._finalizeSignIn(auth,session.credential);default:return debugFail("unexpected MultiFactorSessionType")}}}class PhoneMultiFactorAssertionImpl extends MultiFactorAssertionImpl{constructor(credential){super("phone"),this.credential=credential}static _fromCredential(credential){return new PhoneMultiFactorAssertionImpl(credential)}_finalizeEnroll(auth,idToken,displayName){return function(auth,request){return _performApiRequest(auth,"POST","/v2/accounts/mfaEnrollment:finalize",_addTidIfNecessary(auth,request))}(auth,{idToken:idToken,displayName:displayName,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(auth,mfaPendingCredential){return function(auth,request){return _performApiRequest(auth,"POST","/v2/accounts/mfaSignIn:finalize",_addTidIfNecessary(auth,request))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(auth,{mfaPendingCredential:mfaPendingCredential,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}(class{constructor(){}static assertion(credential){return PhoneMultiFactorAssertionImpl._fromCredential(credential)}}).FACTOR_ID="phone";var index_342f2197_name="@firebase/auth",version="0.19.8";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class AuthInterop{constructor(auth){this.auth=auth,this.internalListeners=new Map}getUid(){var _a;return this.assertAuthConfigured(),(null===(_a=this.auth.currentUser)||void 0===_a?void 0:_a.uid)||null}async getToken(forceRefresh){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;return{accessToken:await this.auth.currentUser.getIdToken(forceRefresh)}}addAuthTokenListener(listener){if(this.assertAuthConfigured(),this.internalListeners.has(listener))return;const unsubscribe=this.auth.onIdTokenChanged(user=>{var _a;listener((null===(_a=user)||void 0===_a?void 0:_a.stsTokenManager.accessToken)||null)});this.internalListeners.set(listener,unsubscribe),this.updateProactiveRefresh()}removeAuthTokenListener(listener){this.assertAuthConfigured();const unsubscribe=this.internalListeners.get(listener);unsubscribe&&(this.internalListeners.delete(listener),unsubscribe(),this.updateProactiveRefresh())}assertAuthConfigured(){_assert(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getAuth(app=Object(esm_index_esm2017.d)()){const provider=Object(esm_index_esm2017.b)(app,"auth");return provider.isInitialized()?provider.getImmediate():function(app,deps){const provider=Object(esm_index_esm2017.b)(app,"auth");if(provider.isInitialized()){const auth=provider.getImmediate(),initialOptions=provider.getOptions();if(Object(index_esm2017.g)(initialOptions,null!==deps&&void 0!==deps?deps:{}))return auth;_fail(auth,"already-initialized")}return provider.initialize({options:deps})}(app,{popupRedirectResolver:browserPopupRedirectResolver,persistence:[indexedDBLocalPersistence,browserLocalPersistence,browserSessionPersistence]})}!function(clientPlatform){Object(esm_index_esm2017.c)(new component_dist_esm_index_esm2017.a("auth",(container,{options:deps})=>{const app=container.getProvider("app").getImmediate(),{apiKey:apiKey,authDomain:authDomain}=app.options;return(app=>{_assert(apiKey&&!apiKey.includes(":"),"invalid-api-key",{appName:app.name}),_assert(!(null===authDomain||void 0===authDomain?void 0:authDomain.includes(":")),"argument-error",{appName:app.name});const config={apiKey:apiKey,authDomain:authDomain,clientPlatform:clientPlatform,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:_getClientVersion(clientPlatform)},authInstance=new index_342f2197_AuthImpl(app,config);return function(auth,deps){const persistence=(null===deps||void 0===deps?void 0:deps.persistence)||[],hierarchy=(Array.isArray(persistence)?persistence:[persistence]).map(_getInstance);(null===deps||void 0===deps?void 0:deps.errorMap)&&auth._updateErrorMap(deps.errorMap),auth._initializeWithPersistence(hierarchy,null===deps||void 0===deps?void 0:deps.popupRedirectResolver)}(authInstance,deps),authInstance})(app)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((container,_instanceIdentifier,_instance)=>{container.getProvider("auth-internal").initialize()})),Object(esm_index_esm2017.c)(new component_dist_esm_index_esm2017.a("auth-internal",container=>(auth=>new AuthInterop(auth))(_castAuth(container.getProvider("auth").getImmediate())),"PRIVATE").setInstantiationMode("EXPLICIT")),Object(esm_index_esm2017.f)(index_342f2197_name,version,function(clientPlatform){switch(clientPlatform){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}(clientPlatform)),Object(esm_index_esm2017.f)(index_342f2197_name,version,"esm2017")}("Browser")},557:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_exports__.a=function(W){function X(d,c,e){var h=c.trim().split(ia);c=h;var a=h.length,m=d.length;switch(m){case 0:case 1:var b=0;for(d=0===m?"":d[0]+" ";b<a;++b)c[b]=Z(d,c[b],e).trim();break;default:var v=b=0;for(c=[];b<a;++b)for(var n=0;n<m;++n)c[v++]=Z(d[n]+" ",h[b],e).trim()}return c}function Z(d,c,e){var h=c.charCodeAt(0);switch(33>h&&(h=(c=c.trim()).charCodeAt(0)),h){case 38:return c.replace(F,"$1"+d.trim());case 58:return d.trim()+c.replace(F,"$1"+d.trim());default:if(0<1*e&&0<c.indexOf("\f"))return c.replace(F,(58===d.charCodeAt(0)?"":"$1")+d.trim())}return d+c}function P(d,c,e,h){var a=d+";",m=2*c+3*e+4*h;if(944===m){d=a.indexOf(":",9)+1;var b=a.substring(d,a.length-1).trim();return b=a.substring(0,d).trim()+b+";",1===w||2===w&&L(b,1)?"-webkit-"+b+b:b}if(0===w||2===w&&!L(a,1))return a;switch(m){case 1015:return 97===a.charCodeAt(10)?"-webkit-"+a+a:a;case 951:return 116===a.charCodeAt(3)?"-webkit-"+a+a:a;case 963:return 110===a.charCodeAt(5)?"-webkit-"+a+a:a;case 1009:if(100!==a.charCodeAt(4))break;case 969:case 942:return"-webkit-"+a+a;case 978:return"-webkit-"+a+"-moz-"+a+a;case 1019:case 983:return"-webkit-"+a+"-moz-"+a+"-ms-"+a+a;case 883:if(45===a.charCodeAt(8))return"-webkit-"+a+a;if(0<a.indexOf("image-set(",11))return a.replace(ja,"$1-webkit-$2")+a;break;case 932:if(45===a.charCodeAt(4))switch(a.charCodeAt(5)){case 103:return"-webkit-box-"+a.replace("-grow","")+"-webkit-"+a+"-ms-"+a.replace("grow","positive")+a;case 115:return"-webkit-"+a+"-ms-"+a.replace("shrink","negative")+a;case 98:return"-webkit-"+a+"-ms-"+a.replace("basis","preferred-size")+a}return"-webkit-"+a+"-ms-"+a+a;case 964:return"-webkit-"+a+"-ms-flex-"+a+a;case 1023:if(99!==a.charCodeAt(8))break;return"-webkit-box-pack"+(b=a.substring(a.indexOf(":",15)).replace("flex-","").replace("space-between","justify"))+"-webkit-"+a+"-ms-flex-pack"+b+a;case 1005:return ka.test(a)?a.replace(aa,":-webkit-")+a.replace(aa,":-moz-")+a:a;case 1e3:switch(c=(b=a.substring(13).trim()).indexOf("-")+1,b.charCodeAt(0)+b.charCodeAt(c)){case 226:b=a.replace(G,"tb");break;case 232:b=a.replace(G,"tb-rl");break;case 220:b=a.replace(G,"lr");break;default:return a}return"-webkit-"+a+"-ms-"+b+a;case 1017:if(-1===a.indexOf("sticky",9))break;case 975:switch(c=(a=d).length-10,m=(b=(33===a.charCodeAt(c)?a.substring(0,c):a).substring(d.indexOf(":",7)+1).trim()).charCodeAt(0)+(0|b.charCodeAt(7))){case 203:if(111>b.charCodeAt(8))break;case 115:a=a.replace(b,"-webkit-"+b)+";"+a;break;case 207:case 102:a=a.replace(b,"-webkit-"+(102<m?"inline-":"")+"box")+";"+a.replace(b,"-webkit-"+b)+";"+a.replace(b,"-ms-"+b+"box")+";"+a}return a+";";case 938:if(45===a.charCodeAt(5))switch(a.charCodeAt(6)){case 105:return"-webkit-"+a+"-webkit-box-"+(b=a.replace("-items",""))+"-ms-flex-"+b+a;case 115:return"-webkit-"+a+"-ms-flex-item-"+a.replace(ba,"")+a;default:return"-webkit-"+a+"-ms-flex-line-pack"+a.replace("align-content","").replace(ba,"")+a}break;case 973:case 989:if(45!==a.charCodeAt(3)||122===a.charCodeAt(4))break;case 931:case 953:if(!0===la.test(d))return 115===(b=d.substring(d.indexOf(":")+1)).charCodeAt(0)?P(d.replace("stretch","fill-available"),c,e,h).replace(":fill-available",":stretch"):a.replace(b,"-webkit-"+b)+a.replace(b,"-moz-"+b.replace("fill-",""))+a;break;case 962:if(a="-webkit-"+a+(102===a.charCodeAt(5)?"-ms-"+a:"")+a,211===e+h&&105===a.charCodeAt(13)&&0<a.indexOf("transform",10))return a.substring(0,a.indexOf(";",27)+1).replace(ma,"$1-webkit-$2")+a}return a}function L(d,c){var e=d.indexOf(1===c?":":"{"),h=d.substring(0,3!==c?e:10);return e=d.substring(e+1,d.length-1),R(2!==c?h:h.replace(na,"$1"),e,c)}function ea(d,c){var e=P(c,c.charCodeAt(0),c.charCodeAt(1),c.charCodeAt(2));return e!==c+";"?e.replace(oa," or ($1)").substring(4):"("+c+")"}function H(d,c,e,h,a,m,b,v,n,q){for(var w,g=0,x=c;g<A;++g)switch(w=S[g].call(B,d,x,e,h,a,m,b,v,n,q)){case void 0:case!1:case!0:case null:break;default:x=w}if(x!==c)return x}function U(d){return void 0!==(d=d.prefix)&&(R=null,d?"function"!=typeof d?w=1:(w=2,R=d):w=0),U}function B(d,c){var e=d;if(33>e.charCodeAt(0)&&(e=e.trim()),e=[e],0<A){var h=H(-1,c,e,e,D,z,0,0,0,0);void 0!==h&&"string"==typeof h&&(c=h)}var a=function M(d,c,e,h,a){for(var q,g,k,y,C,m=0,b=0,v=0,n=0,x=0,K=0,u=k=q=0,l=0,r=0,I=0,t=0,B=e.length,J=B-1,f="",p="",F="",G="";l<B;){if(g=e.charCodeAt(l),l===J&&0!==b+n+v+m&&(0!==b&&(g=47===b?10:47),n=v=m=0,B++,J++),0===b+n+v+m){if(l===J&&(0<r&&(f=f.replace(N,"")),0<f.trim().length)){switch(g){case 32:case 9:case 59:case 13:case 10:break;default:f+=e.charAt(l)}g=59}switch(g){case 123:for(q=(f=f.trim()).charCodeAt(0),k=1,t=++l;l<B;){switch(g=e.charCodeAt(l)){case 123:k++;break;case 125:k--;break;case 47:switch(g=e.charCodeAt(l+1)){case 42:case 47:a:{for(u=l+1;u<J;++u)switch(e.charCodeAt(u)){case 47:if(42===g&&42===e.charCodeAt(u-1)&&l+2!==u){l=u+1;break a}break;case 10:if(47===g){l=u+1;break a}}l=u}}break;case 91:g++;case 40:g++;case 34:case 39:for(;l++<J&&e.charCodeAt(l)!==g;);}if(0===k)break;l++}switch(k=e.substring(t,l),0===q&&(q=(f=f.replace(ca,"").trim()).charCodeAt(0)),q){case 64:switch(0<r&&(f=f.replace(N,"")),g=f.charCodeAt(1)){case 100:case 109:case 115:case 45:r=c;break;default:r=O}if(t=(k=M(c,r,k,g,a+1)).length,0<A&&(C=H(3,k,r=X(O,f,I),c,D,z,t,g,a,h),f=r.join(""),void 0!==C&&0===(t=(k=C.trim()).length)&&(g=0,k="")),0<t)switch(g){case 115:f=f.replace(da,ea);case 100:case 109:case 45:k=f+"{"+k+"}";break;case 107:k=(f=f.replace(fa,"$1 $2"))+"{"+k+"}",k=1===w||2===w&&L("@"+k,3)?"@-webkit-"+k+"@"+k:"@"+k;break;default:k=f+k,112===h&&(p+=k,k="")}else k="";break;default:k=M(c,X(c,f,I),k,h,a+1)}F+=k,k=I=r=u=q=0,f="",g=e.charCodeAt(++l);break;case 125:case 59:if(1<(t=(f=(0<r?f.replace(N,""):f).trim()).length))switch(0===u&&(q=f.charCodeAt(0),45===q||96<q&&123>q)&&(t=(f=f.replace(" ",":")).length),0<A&&void 0!==(C=H(1,f,c,d,D,z,p.length,h,a,h))&&0===(t=(f=C.trim()).length)&&(f="\0\0"),q=f.charCodeAt(0),g=f.charCodeAt(1),q){case 0:break;case 64:if(105===g||99===g){G+=f+e.charAt(l);break}default:58!==f.charCodeAt(t-1)&&(p+=P(f,q,g,f.charCodeAt(2)))}I=r=u=q=0,f="",g=e.charCodeAt(++l)}}switch(g){case 13:case 10:47===b?b=0:0===1+q&&107!==h&&0<f.length&&(r=1,f+="\0"),0<A*Y&&H(0,f,c,d,D,z,p.length,h,a,h),z=1,D++;break;case 59:case 125:if(0===b+n+v+m){z++;break}default:switch(z++,y=e.charAt(l),g){case 9:case 32:if(0===n+m+b)switch(x){case 44:case 58:case 9:case 32:y="";break;default:32!==g&&(y=" ")}break;case 0:y="\\0";break;case 12:y="\\f";break;case 11:y="\\v";break;case 38:0===n+b+m&&(r=I=1,y="\f"+y);break;case 108:if(0===n+b+m+E&&0<u)switch(l-u){case 2:112===x&&58===e.charCodeAt(l-3)&&(E=x);case 8:111===K&&(E=K)}break;case 58:0===n+b+m&&(u=l);break;case 44:0===b+v+n+m&&(r=1,y+="\r");break;case 34:case 39:0===b&&(n=n===g?0:0===n?g:n);break;case 91:0===n+b+v&&m++;break;case 93:0===n+b+v&&m--;break;case 41:0===n+b+m&&v--;break;case 40:if(0===n+b+m){if(0===q)switch(2*x+3*K){case 533:break;default:q=1}v++}break;case 64:0===b+v+n+m+u+k&&(k=1);break;case 42:case 47:if(!(0<n+m+v))switch(b){case 0:switch(2*g+3*e.charCodeAt(l+1)){case 235:b=47;break;case 220:t=l,b=42}break;case 42:47===g&&42===x&&t+2!==l&&(33===e.charCodeAt(t+2)&&(p+=e.substring(t,l+1)),y="",b=0)}}0===b&&(f+=y)}K=x,x=g,l++}if(0<(t=p.length)){if(r=c,0<A&&void 0!==(C=H(2,p,r,d,D,z,t,h,a,h))&&0===(p=C).length)return G+p+F;if(p=r.join(",")+"{"+p+"}",0!=w*E){switch(2!==w||L(p,2)||(E=0),E){case 111:p=p.replace(ha,":-moz-$1")+p;break;case 112:p=p.replace(Q,"::-webkit-input-$1")+p.replace(Q,"::-moz-$1")+p.replace(Q,":-ms-input-$1")+p}E=0}}return G+p+F}(O,e,c,0,0);return 0<A&&void 0!==(h=H(-2,a,e,e,D,z,a.length,0,0,0))&&(a=h),E=0,z=D=1,a}var ca=/^\0+/g,N=/[\0\r\f]/g,aa=/: */g,ka=/zoo|gra/,ma=/([,: ])(transform)/g,ia=/,\r+?/g,F=/([\t\r\n ])*\f?&/g,fa=/@(k\w+)\s*(\S*)\s*/,Q=/::(place)/g,ha=/:(read-only)/g,G=/[svh]\w+-[tblr]{2}/,da=/\(\s*(.*)\s*\)/g,oa=/([\s\S]*?);/g,ba=/-self|flex-/g,na=/[^]*?(:[rp][el]a[\w-]+)[^]*/,la=/stretch|:\s*\w+\-(?:conte|avail)/,ja=/([^-])(image-set\()/,z=1,D=1,E=0,w=1,O=[],S=[],A=0,R=null,Y=0;return B.use=function T(d){switch(d){case void 0:case null:A=S.length=0;break;default:if("function"==typeof d)S[A++]=d;else if("object"==typeof d)for(var c=0,e=d.length;c<e;++c)T(d[c]);else Y=0|!!d}return T},B.set=U,void 0!==W&&U(W),B}},558:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_exports__.a={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1}},578:function(module,__webpack_exports__,__webpack_require__){"use strict";var objectSpread2=__webpack_require__(60),react=__webpack_require__(0),asn_WarningFilled={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zM480 416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416zm32 352a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"}}]},name:"warning",theme:"filled"},AntdIcon=__webpack_require__(66),icons_WarningFilled_WarningFilled=function(props,ref){return react.createElement(AntdIcon.a,Object(objectSpread2.a)(Object(objectSpread2.a)({},props),{},{ref:ref,icon:asn_WarningFilled}))};icons_WarningFilled_WarningFilled.displayName="WarningFilled";__webpack_exports__.a=react.forwardRef(icons_WarningFilled_WarningFilled)},580:function(module,__webpack_exports__,__webpack_require__){"use strict";var reactPropsRegex=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,index=function(fn){var cache={};return function(arg){return void 0===cache[arg]&&(cache[arg]=fn(arg)),cache[arg]}}(function(prop){return reactPropsRegex.test(prop)||111===prop.charCodeAt(0)&&110===prop.charCodeAt(1)&&prop.charCodeAt(2)<91});__webpack_exports__.a=index},618:function(module,__webpack_exports__,__webpack_require__){"use strict";var objectSpread2=__webpack_require__(60),react=__webpack_require__(0),asn_GoogleOutlined={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M881 442.4H519.7v148.5h206.4c-8.9 48-35.9 88.6-76.6 115.8-34.4 23-78.3 36.6-129.9 36.6-99.9 0-184.4-67.5-214.6-158.2-7.6-23-12-47.6-12-72.9s4.4-49.9 12-72.9c30.3-90.6 114.8-158.1 214.7-158.1 56.3 0 106.8 19.4 146.6 57.4l110-110.1c-66.5-62-153.2-100-256.6-100-149.9 0-279.6 86-342.7 211.4-26 51.8-40.8 110.4-40.8 172.4S151 632.8 177 684.6C240.1 810 369.8 896 519.7 896c103.6 0 190.4-34.4 253.8-93 72.5-66.8 114.4-165.2 114.4-282.1 0-27.2-2.4-53.3-6.9-78.5z"}}]},name:"google",theme:"outlined"},AntdIcon=__webpack_require__(66),icons_GoogleOutlined_GoogleOutlined=function(props,ref){return react.createElement(AntdIcon.a,Object(objectSpread2.a)(Object(objectSpread2.a)({},props),{},{ref:ref,icon:asn_GoogleOutlined}))};icons_GoogleOutlined_GoogleOutlined.displayName="GoogleOutlined";__webpack_exports__.a=react.forwardRef(icons_GoogleOutlined_GoogleOutlined)},619:function(module,__webpack_exports__,__webpack_require__){"use strict";var objectSpread2=__webpack_require__(60),react=__webpack_require__(0),asn_HomeOutlined={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"}}]},name:"home",theme:"outlined"},AntdIcon=__webpack_require__(66),icons_HomeOutlined_HomeOutlined=function(props,ref){return react.createElement(AntdIcon.a,Object(objectSpread2.a)(Object(objectSpread2.a)({},props),{},{ref:ref,icon:asn_HomeOutlined}))};icons_HomeOutlined_HomeOutlined.displayName="HomeOutlined";__webpack_exports__.a=react.forwardRef(icons_HomeOutlined_HomeOutlined)},620:function(module,__webpack_exports__,__webpack_require__){"use strict";var objectSpread2=__webpack_require__(60),react=__webpack_require__(0),asn_FileDoneOutlined={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M688 312v-48c0-4.4-3.6-8-8-8H296c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8zm-392 88c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H296zm376 116c-119.3 0-216 96.7-216 216s96.7 216 216 216 216-96.7 216-216-96.7-216-216-216zm107.5 323.5C750.8 868.2 712.6 884 672 884s-78.8-15.8-107.5-44.5C535.8 810.8 520 772.6 520 732s15.8-78.8 44.5-107.5C593.2 595.8 631.4 580 672 580s78.8 15.8 107.5 44.5C808.2 653.2 824 691.4 824 732s-15.8 78.8-44.5 107.5zM761 656h-44.3c-2.6 0-5 1.2-6.5 3.3l-63.5 87.8-23.1-31.9a7.92 7.92 0 00-6.5-3.3H573c-6.5 0-10.3 7.4-6.5 12.7l73.8 102.1c3.2 4.4 9.7 4.4 12.9 0l114.2-158c3.9-5.3.1-12.7-6.4-12.7zM440 852H208V148h560v344c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V108c0-17.7-14.3-32-32-32H168c-17.7 0-32 14.3-32 32v784c0 17.7 14.3 32 32 32h272c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"}}]},name:"file-done",theme:"outlined"},AntdIcon=__webpack_require__(66),icons_FileDoneOutlined_FileDoneOutlined=function(props,ref){return react.createElement(AntdIcon.a,Object(objectSpread2.a)(Object(objectSpread2.a)({},props),{},{ref:ref,icon:asn_FileDoneOutlined}))};icons_FileDoneOutlined_FileDoneOutlined.displayName="FileDoneOutlined";__webpack_exports__.a=react.forwardRef(icons_FileDoneOutlined_FileDoneOutlined)},621:function(module,__webpack_exports__,__webpack_require__){"use strict";var objectSpread2=__webpack_require__(60),react=__webpack_require__(0),asn_UserOutlined={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"}}]},name:"user",theme:"outlined"},AntdIcon=__webpack_require__(66),icons_UserOutlined_UserOutlined=function(props,ref){return react.createElement(AntdIcon.a,Object(objectSpread2.a)(Object(objectSpread2.a)({},props),{},{ref:ref,icon:asn_UserOutlined}))};icons_UserOutlined_UserOutlined.displayName="UserOutlined";__webpack_exports__.a=react.forwardRef(icons_UserOutlined_UserOutlined)},622:function(module,__webpack_exports__,__webpack_require__){"use strict";var objectSpread2=__webpack_require__(60),react=__webpack_require__(0),asn_LogoutOutlined={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 01-112.7 75.9A352.8 352.8 0 01512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 01-112.7-75.9 353.28 353.28 0 01-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 000-12.6z"}}]},name:"logout",theme:"outlined"},AntdIcon=__webpack_require__(66),icons_LogoutOutlined_LogoutOutlined=function(props,ref){return react.createElement(AntdIcon.a,Object(objectSpread2.a)(Object(objectSpread2.a)({},props),{},{ref:ref,icon:asn_LogoutOutlined}))};icons_LogoutOutlined_LogoutOutlined.displayName="LogoutOutlined";__webpack_exports__.a=react.forwardRef(icons_LogoutOutlined_LogoutOutlined)},623:function(module,__webpack_exports__,__webpack_require__){"use strict";var objectSpread2=__webpack_require__(60),react=__webpack_require__(0),asn_MenuOutlined={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"}}]},name:"menu",theme:"outlined"},AntdIcon=__webpack_require__(66),icons_MenuOutlined_MenuOutlined=function(props,ref){return react.createElement(AntdIcon.a,Object(objectSpread2.a)(Object(objectSpread2.a)({},props),{},{ref:ref,icon:asn_MenuOutlined}))};icons_MenuOutlined_MenuOutlined.displayName="MenuOutlined";__webpack_exports__.a=react.forwardRef(icons_MenuOutlined_MenuOutlined)},624:function(module,__webpack_exports__,__webpack_require__){"use strict";var objectSpread2=__webpack_require__(60),react=__webpack_require__(0),asn_SyncOutlined={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 01755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8zm756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 01512.1 856a342.24 342.24 0 01-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 00-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 00-8-8.2z"}}]},name:"sync",theme:"outlined"},AntdIcon=__webpack_require__(66),icons_SyncOutlined_SyncOutlined=function(props,ref){return react.createElement(AntdIcon.a,Object(objectSpread2.a)(Object(objectSpread2.a)({},props),{},{ref:ref,icon:asn_SyncOutlined}))};icons_SyncOutlined_SyncOutlined.displayName="SyncOutlined";__webpack_exports__.a=react.forwardRef(icons_SyncOutlined_SyncOutlined)},625:function(module,__webpack_exports__,__webpack_require__){"use strict";var objectSpread2=__webpack_require__(60),react=__webpack_require__(0),asn_LikeOutlined={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 00-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 00471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0142.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z"}}]},name:"like",theme:"outlined"},AntdIcon=__webpack_require__(66),icons_LikeOutlined_LikeOutlined=function(props,ref){return react.createElement(AntdIcon.a,Object(objectSpread2.a)(Object(objectSpread2.a)({},props),{},{ref:ref,icon:asn_LikeOutlined}))};icons_LikeOutlined_LikeOutlined.displayName="LikeOutlined";__webpack_exports__.a=react.forwardRef(icons_LikeOutlined_LikeOutlined)},626:function(module,__webpack_exports__,__webpack_require__){"use strict";var objectSpread2=__webpack_require__(60),react=__webpack_require__(0),asn_LikeFilled={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 00-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 00471 99.9c-52 0-98 35-111.8 85.1l-85.9 311h-.3v428h472.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM112 528v364c0 17.7 14.3 32 32 32h65V496h-65c-17.7 0-32 14.3-32 32z"}}]},name:"like",theme:"filled"},AntdIcon=__webpack_require__(66),icons_LikeFilled_LikeFilled=function(props,ref){return react.createElement(AntdIcon.a,Object(objectSpread2.a)(Object(objectSpread2.a)({},props),{},{ref:ref,icon:asn_LikeFilled}))};icons_LikeFilled_LikeFilled.displayName="LikeFilled";__webpack_exports__.a=react.forwardRef(icons_LikeFilled_LikeFilled)},627:function(module,__webpack_exports__,__webpack_require__){"use strict";var objectSpread2=__webpack_require__(60),react=__webpack_require__(0),asn_DislikeFilled={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M885.9 490.3c3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-51.6-30.7-98.1-78.3-118.4a66.1 66.1 0 00-26.5-5.4H273v428h.3l85.8 310.8C372.9 889 418.9 924 470.9 924c29.7 0 57.4-11.8 77.9-33.4 20.5-21.5 31-49.7 29.5-79.4l-6-122.9h239.9c12.1 0 23.9-3.2 34.3-9.3 40.4-23.5 65.5-66.1 65.5-111 0-28.3-9.3-55.5-26.1-77.7zM112 132v364c0 17.7 14.3 32 32 32h65V100h-65c-17.7 0-32 14.3-32 32z"}}]},name:"dislike",theme:"filled"},AntdIcon=__webpack_require__(66),icons_DislikeFilled_DislikeFilled=function(props,ref){return react.createElement(AntdIcon.a,Object(objectSpread2.a)(Object(objectSpread2.a)({},props),{},{ref:ref,icon:asn_DislikeFilled}))};icons_DislikeFilled_DislikeFilled.displayName="DislikeFilled";__webpack_exports__.a=react.forwardRef(icons_DislikeFilled_DislikeFilled)},628:function(module,__webpack_exports__,__webpack_require__){"use strict";var objectSpread2=__webpack_require__(60),react=__webpack_require__(0),asn_DislikeOutlined={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M885.9 490.3c3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-51.6-30.7-98.1-78.3-118.4a66.1 66.1 0 00-26.5-5.4H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h129.3l85.8 310.8C372.9 889 418.9 924 470.9 924c29.7 0 57.4-11.8 77.9-33.4 20.5-21.5 31-49.7 29.5-79.4l-6-122.9h239.9c12.1 0 23.9-3.2 34.3-9.3 40.4-23.5 65.5-66.1 65.5-111 0-28.3-9.3-55.5-26.1-77.7zM184 456V172h81v284h-81zm627.2 160.4H496.8l9.6 198.4c.6 11.9-4.7 23.1-14.6 30.5-6.1 4.5-13.6 6.8-21.1 6.7a44.28 44.28 0 01-42.2-32.3L329 459.2V172h415.4a56.85 56.85 0 0133.6 51.8c0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4 21.9 19a56.76 56.76 0 0119.6 43c0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4 21.9 19a56.76 56.76 0 0119.6 43c0 9.7-2.3 18.9-6.9 27.3l-14 25.5 21.9 19a56.76 56.76 0 0119.6 43c0 19.1-11 37.5-28.8 48.4z"}}]},name:"dislike",theme:"outlined"},AntdIcon=__webpack_require__(66),icons_DislikeOutlined_DislikeOutlined=function(props,ref){return react.createElement(AntdIcon.a,Object(objectSpread2.a)(Object(objectSpread2.a)({},props),{},{ref:ref,icon:asn_DislikeOutlined}))};icons_DislikeOutlined_DislikeOutlined.displayName="DislikeOutlined";__webpack_exports__.a=react.forwardRef(icons_DislikeOutlined_DislikeOutlined)}}]);