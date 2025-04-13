/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/flights/route";
exports.ids = ["app/api/flights/route"];
exports.modules = {

/***/ "(rsc)/./app/api/flights/route.js":
/*!**********************************!*\
  !*** ./app/api/flights/route.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var _app_db_postgres__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/app/db/postgres */ \"(rsc)/./app/db/postgres.js\");\n\nasync function GET(request) {\n    try {\n        let flights = await (0,_app_db_postgres__WEBPACK_IMPORTED_MODULE_0__.query)(`Select * from flights limit 100`);\n        return new Response(JSON.stringify(flights.rows), {\n            headers: {\n                \"Content-Type\": \"application/json\"\n            }\n        });\n    } catch (err) {\n        console.error(err);\n        return new Response(JSON.stringify({\n            error: 'An error occurred'\n        }), {\n            status: 500,\n            headers: {\n                \"Content-Type\": 'application/json'\n            }\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2ZsaWdodHMvcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBMEM7QUFFbkMsZUFBZUMsSUFBSUMsT0FBTztJQUM3QixJQUFJO1FBQ0EsSUFBSUMsVUFBVSxNQUFNSCx1REFBS0EsQ0FBQyxDQUFDLCtCQUErQixDQUFDO1FBQzNELE9BQU8sSUFBSUksU0FBU0MsS0FBS0MsU0FBUyxDQUFDSCxRQUFRSSxJQUFJLEdBQUc7WUFDOUNDLFNBQVM7Z0JBQUMsZ0JBQWdCO1lBQWtCO1FBQ2hEO0lBQ0osRUFBRSxPQUFPQyxLQUFLO1FBQ1ZDLFFBQVFDLEtBQUssQ0FBQ0Y7UUFDZCxPQUFPLElBQUlMLFNBQVNDLEtBQUtDLFNBQVMsQ0FBQztZQUFDSyxPQUFPO1FBQW1CLElBQUk7WUFDOURDLFFBQVE7WUFDUkosU0FBUztnQkFBQyxnQkFBZ0I7WUFBa0I7UUFDaEQ7SUFDSjtBQUNKIiwic291cmNlcyI6WyIvVXNlcnMvbWF0dG9uaW11cy9MZWhpZ2gvU1AyNS8yMDI1X1NQX3Byb2plY3RzLzIwMjUtU1AtcHJvamVjdDEwL2FwcC9hcGkvZmxpZ2h0cy9yb3V0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJAL2FwcC9kYi9wb3N0Z3Jlc1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcXVlc3QpIHtcbiAgICB0cnkge1xuICAgICAgICBsZXQgZmxpZ2h0cyA9IGF3YWl0IHF1ZXJ5KGBTZWxlY3QgKiBmcm9tIGZsaWdodHMgbGltaXQgMTAwYClcbiAgICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShKU09OLnN0cmluZ2lmeShmbGlnaHRzLnJvd3MpLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJ9XG4gICAgICAgIH0pXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKVxuICAgICAgICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KHtlcnJvcjogJ0FuIGVycm9yIG9jY3VycmVkJ30pLCB7XG4gICAgICAgICAgICBzdGF0dXM6IDUwMCxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcIkNvbnRlbnQtVHlwZVwiOiAnYXBwbGljYXRpb24vanNvbid9XG4gICAgICAgIH0pXG4gICAgfVxufVxuXG4iXSwibmFtZXMiOlsicXVlcnkiLCJHRVQiLCJyZXF1ZXN0IiwiZmxpZ2h0cyIsIlJlc3BvbnNlIiwiSlNPTiIsInN0cmluZ2lmeSIsInJvd3MiLCJoZWFkZXJzIiwiZXJyIiwiY29uc29sZSIsImVycm9yIiwic3RhdHVzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/flights/route.js\n");

/***/ }),

/***/ "(rsc)/./app/db/postgres.js":
/*!****************************!*\
  !*** ./app/db/postgres.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   query: () => (/* binding */ query)\n/* harmony export */ });\n/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pg */ \"pg\");\n/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pg__WEBPACK_IMPORTED_MODULE_0__);\n\nconst { Client } = (pg__WEBPACK_IMPORTED_MODULE_0___default());\nconst client = new Client({\n    host: process.env.POSTGRES_HOST,\n    port: Number(process.env.POSTGRES_PORT),\n    database: process.env.POSTGRES_DBNAME,\n    user: process.env.POSTGRES_USERNAME,\n    password: process.env.POSTGRES_PASSWORD,\n    ssl: {\n        rejectUnauthorized: false\n    }\n});\nclient.connect();\nconst query = async (text, values)=>{\n    try {\n        const start = new Date();\n        console.log(\"query to be executed:\", text);\n        const res = await client.query(text, values);\n        const duration = new Date() - start;\n        console.log('executed postgres query: ', {\n            text,\n            duration,\n            rows: res.rowCount\n        });\n        return res;\n    } catch (err) {\n        console.error(\"Problem executing query\");\n        console.error(err);\n        throw err;\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvZGIvcG9zdGdyZXMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQW1CO0FBRW5CLE1BQU0sRUFBRUMsTUFBTSxFQUFFLEdBQUdELDJDQUFFQTtBQUVyQixNQUFNRSxTQUFTLElBQUlELE9BQU87SUFDeEJFLE1BQU1DLFFBQVFDLEdBQUcsQ0FBQ0MsYUFBYTtJQUMvQkMsTUFBTUMsT0FBT0osUUFBUUMsR0FBRyxDQUFDSSxhQUFhO0lBQ3RDQyxVQUFVTixRQUFRQyxHQUFHLENBQUNNLGVBQWU7SUFDckNDLE1BQU1SLFFBQVFDLEdBQUcsQ0FBQ1EsaUJBQWlCO0lBQ25DQyxVQUFVVixRQUFRQyxHQUFHLENBQUNVLGlCQUFpQjtJQUN2Q0MsS0FBSztRQUNIQyxvQkFBb0I7SUFDdEI7QUFDRjtBQUVBZixPQUFPZ0IsT0FBTztBQUVQLE1BQU1DLFFBQVEsT0FBT0MsTUFBTUM7SUFFOUIsSUFBRztRQUNDLE1BQU1DLFFBQVEsSUFBSUM7UUFDbEJDLFFBQVFDLEdBQUcsQ0FBQyx5QkFBeUJMO1FBQ3JDLE1BQU1NLE1BQU0sTUFBTXhCLE9BQU9pQixLQUFLLENBQUNDLE1BQU1DO1FBQ3JDLE1BQU1NLFdBQVcsSUFBSUosU0FBU0Q7UUFDOUJFLFFBQVFDLEdBQUcsQ0FBQyw2QkFBNkI7WUFBRUw7WUFBTU87WUFBVUMsTUFBTUYsSUFBSUcsUUFBUTtRQUFBO1FBQzdFLE9BQU9IO0lBQ1gsRUFBRSxPQUFPSSxLQUFLO1FBQ1ZOLFFBQVFPLEtBQUssQ0FBQztRQUNkUCxRQUFRTyxLQUFLLENBQUNEO1FBQ2QsTUFBTUE7SUFDVjtBQUVKLEVBQUMiLCJzb3VyY2VzIjpbIi9Vc2Vycy9tYXR0b25pbXVzL0xlaGlnaC9TUDI1LzIwMjVfU1BfcHJvamVjdHMvMjAyNS1TUC1wcm9qZWN0MTAvYXBwL2RiL3Bvc3RncmVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwZyBmcm9tICdwZydcblxuY29uc3QgeyBDbGllbnQgfSA9IHBnXG4gXG5jb25zdCBjbGllbnQgPSBuZXcgQ2xpZW50KHtcbiAgaG9zdDogcHJvY2Vzcy5lbnYuUE9TVEdSRVNfSE9TVCxcbiAgcG9ydDogTnVtYmVyKHByb2Nlc3MuZW52LlBPU1RHUkVTX1BPUlQpLFxuICBkYXRhYmFzZTogcHJvY2Vzcy5lbnYuUE9TVEdSRVNfREJOQU1FLFxuICB1c2VyOiBwcm9jZXNzLmVudi5QT1NUR1JFU19VU0VSTkFNRSxcbiAgcGFzc3dvcmQ6IHByb2Nlc3MuZW52LlBPU1RHUkVTX1BBU1NXT1JELFxuICBzc2w6IHtcbiAgICByZWplY3RVbmF1dGhvcml6ZWQ6IGZhbHNlXG4gIH1cbn0pXG5cbmNsaWVudC5jb25uZWN0KClcblxuZXhwb3J0IGNvbnN0IHF1ZXJ5ID0gYXN5bmMgKHRleHQsIHZhbHVlcykgPT4ge1xuICAgICAgIFxuICAgIHRyeXtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZSgpXG4gICAgICAgIGNvbnNvbGUubG9nKFwicXVlcnkgdG8gYmUgZXhlY3V0ZWQ6XCIsIHRleHQpXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGNsaWVudC5xdWVyeSh0ZXh0LCB2YWx1ZXMpXG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gbmV3IERhdGUoKSAtIHN0YXJ0XG4gICAgICAgIGNvbnNvbGUubG9nKCdleGVjdXRlZCBwb3N0Z3JlcyBxdWVyeTogJywgeyB0ZXh0LCBkdXJhdGlvbiwgcm93czogcmVzLnJvd0NvdW50fSlcbiAgICAgICAgcmV0dXJuIHJlc1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiUHJvYmxlbSBleGVjdXRpbmcgcXVlcnlcIilcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpXG4gICAgICAgIHRocm93IGVyclxuICAgIH1cbiAgICBcbn1cblxuIl0sIm5hbWVzIjpbInBnIiwiQ2xpZW50IiwiY2xpZW50IiwiaG9zdCIsInByb2Nlc3MiLCJlbnYiLCJQT1NUR1JFU19IT1NUIiwicG9ydCIsIk51bWJlciIsIlBPU1RHUkVTX1BPUlQiLCJkYXRhYmFzZSIsIlBPU1RHUkVTX0RCTkFNRSIsInVzZXIiLCJQT1NUR1JFU19VU0VSTkFNRSIsInBhc3N3b3JkIiwiUE9TVEdSRVNfUEFTU1dPUkQiLCJzc2wiLCJyZWplY3RVbmF1dGhvcml6ZWQiLCJjb25uZWN0IiwicXVlcnkiLCJ0ZXh0IiwidmFsdWVzIiwic3RhcnQiLCJEYXRlIiwiY29uc29sZSIsImxvZyIsInJlcyIsImR1cmF0aW9uIiwicm93cyIsInJvd0NvdW50IiwiZXJyIiwiZXJyb3IiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/db/postgres.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fflights%2Froute&page=%2Fapi%2Fflights%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fflights%2Froute.js&appDir=%2FUsers%2Fmattonimus%2FLehigh%2FSP25%2F2025_SP_projects%2F2025-SP-project10%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmattonimus%2FLehigh%2FSP25%2F2025_SP_projects%2F2025-SP-project10&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fflights%2Froute&page=%2Fapi%2Fflights%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fflights%2Froute.js&appDir=%2FUsers%2Fmattonimus%2FLehigh%2FSP25%2F2025_SP_projects%2F2025-SP-project10%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmattonimus%2FLehigh%2FSP25%2F2025_SP_projects%2F2025-SP-project10&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_mattonimus_Lehigh_SP25_2025_SP_projects_2025_SP_project10_app_api_flights_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/flights/route.js */ \"(rsc)/./app/api/flights/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/flights/route\",\n        pathname: \"/api/flights\",\n        filename: \"route\",\n        bundlePath: \"app/api/flights/route\"\n    },\n    resolvedPagePath: \"/Users/mattonimus/Lehigh/SP25/2025_SP_projects/2025-SP-project10/app/api/flights/route.js\",\n    nextConfigOutput,\n    userland: _Users_mattonimus_Lehigh_SP25_2025_SP_projects_2025_SP_project10_app_api_flights_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZmbGlnaHRzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZmbGlnaHRzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGZmxpZ2h0cyUyRnJvdXRlLmpzJmFwcERpcj0lMkZVc2VycyUyRm1hdHRvbmltdXMlMkZMZWhpZ2glMkZTUDI1JTJGMjAyNV9TUF9wcm9qZWN0cyUyRjIwMjUtU1AtcHJvamVjdDEwJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRm1hdHRvbmltdXMlMkZMZWhpZ2glMkZTUDI1JTJGMjAyNV9TUF9wcm9qZWN0cyUyRjIwMjUtU1AtcHJvamVjdDEwJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUN5QztBQUN0SDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL21hdHRvbmltdXMvTGVoaWdoL1NQMjUvMjAyNV9TUF9wcm9qZWN0cy8yMDI1LVNQLXByb2plY3QxMC9hcHAvYXBpL2ZsaWdodHMvcm91dGUuanNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2ZsaWdodHMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9mbGlnaHRzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9mbGlnaHRzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL21hdHRvbmltdXMvTGVoaWdoL1NQMjUvMjAyNV9TUF9wcm9qZWN0cy8yMDI1LVNQLXByb2plY3QxMC9hcHAvYXBpL2ZsaWdodHMvcm91dGUuanNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fflights%2Froute&page=%2Fapi%2Fflights%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fflights%2Froute.js&appDir=%2FUsers%2Fmattonimus%2FLehigh%2FSP25%2F2025_SP_projects%2F2025-SP-project10%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmattonimus%2FLehigh%2FSP25%2F2025_SP_projects%2F2025-SP-project10&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("pg");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fflights%2Froute&page=%2Fapi%2Fflights%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fflights%2Froute.js&appDir=%2FUsers%2Fmattonimus%2FLehigh%2FSP25%2F2025_SP_projects%2F2025-SP-project10%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmattonimus%2FLehigh%2FSP25%2F2025_SP_projects%2F2025-SP-project10&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();