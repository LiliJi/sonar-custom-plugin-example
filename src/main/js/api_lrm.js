/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com
 */
import {getJSON} from 'sonar-request'; // see https://github.com/SonarSource/sonarqube/blob/master/server/sonar-web/src/main/js/app/utils/exposeLibraries.js

export function findQualityProfilesStatistics(project) {
  return getJSON('/api/qualityprofiles/search').then(function (response) {
     return response.profiles.length;
  });
}

export function findQualityQatesStatistics(project) {
  return getJSON('/api/qualitygates/list').then(function (response) {
     return response.qualitygates.length;
  });
}

export function findIssuesStatistics(project) {
  return getJSON('/api/issues/search').then(function (response) {
     return response.total;
  });
}

export function findProjects(project) {
  return getJSON('/api/projects/search').then(function (response) {
     return response.components.length;
  });
}


export function findlrmEndDate(project) {

return getJSON('/api/project_analyses/search', {
  project: project.key,
  p: 1,
  ps: 500,
}).then(function (responseAnalyses) {
  const numberOfAnalyses = responseAnalyses.analyses.length;
  if (numberOfAnalyses > 0) {
    return getJSON('/api/measures/search_history', {
      component: project.key,
      metrics: "lngprt-lrm-license-enddate,lngprt-lqa-license-enddate",
      ps: 1000
    }).then(function (responseMetrics) {
      var data = [];
      var numberOfVersions=0;

      for (let i = 0; i < numberOfAnalyses; i++) {
        let analysis = responseAnalyses.analyses[i];
        for (let j = 0; j < analysis.events.length; j++) {
          if (analysis.events[j].category === "VERSION") {
            let result = {version: analysis.events[j].name,
                          endDate: "",
                          lqaendDate:"",
                         };
            const numberOfMeasuresRetrieved = 2;

            for (let k = 0; k < numberOfMeasuresRetrieved; k++) {
              for(let d = 0; d < responseMetrics.measures[k].history.length; d++) {
                if ( responseMetrics.measures[k].history[d].date === responseAnalyses.analyses[i].date ) {
                  //console.log(responseMetrics.measures[k].metric);
                  if (responseMetrics.measures[k].metric === "lngprt-lrm-license-enddate") {
                    result.endDate = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lqa-license-enddate") {
                      result.lqaendDate = responseMetrics.measures[k].history[d].value;
                  }

                }
              }
            }

            data[numberOfVersions] = result;
            numberOfVersions++;
          }
        }
      }
      //console.table(data);
      return data;
    });
  }
 });
}


export function findPrepLocale(project) {

return getJSON('/api/project_analyses/search', {
  project: project.key,
  p: 1,
  ps: 500,
}).then(function (responseAnalyses) {
  const numberOfAnalyses = responseAnalyses.analyses.length;
  if (numberOfAnalyses > 0) {
    return getJSON('/api/measures/search_history', {
      component: project.key,
      metrics: "lngprt-lrm-files-to-prep-locale_ids,lngprt-lrm-num-files-to-prep-locales,lngprt-lrm-num-keys-to-prep-locales,lngprt-lrm-num-words-to-prep-locales,lngprt-lrm-num-files-to-prep-locale_names,lngprt-lrm-files-to-prep,lngprt-lrm-critical-errors",
      ps: 1000
    }).then(function (responseMetrics) {
      var data = [];
      var numberOfVersions=0;

      for (let i = 0; i < numberOfAnalyses; i++) {
        let analysis = responseAnalyses.analyses[i];
        for (let j = 0; j < analysis.events.length; j++) {
          if (analysis.events[j].category === "VERSION") {
            let result = {version: analysis.events[j].name,
                          localeMSR: "",
                          numFilesMSR:"",
                          numKeysMSR:"",
                          numWordsMSR:"",
                          displayNameMSR:"",
                          filesToPrepMSR:"",
                          errorCountMSR:"",
                         };
            const numberOfMeasuresRetrieved = 7;

            for (let k = 0; k < numberOfMeasuresRetrieved; k++) {
              for(let d = 0; d < responseMetrics.measures[k].history.length; d++) {
                if ( responseMetrics.measures[k].history[d].date === responseAnalyses.analyses[i].date ) {
                  //console.log(responseMetrics.measures[k].metric);
                  if (responseMetrics.measures[k].metric === "lngprt-lrm-files-to-prep-locale_ids") {
                    result.localeMSR = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-num-files-to-prep-locales") {
                      result.numFilesMSR = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-num-keys-to-prep-locales") {
                      result.numKeysMSR = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-num-words-to-prep-locales") {
                      result.numWordsMSR = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-num-files-to-prep-locale_names") {
                      result.displayNameMSR = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-files-to-prep") {
                      result.filesToPrepMSR = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-critical-errors") {
                      result.errorCountMSR = responseMetrics.measures[k].history[d].value;
                  }
                }
              }
            }

            data[numberOfVersions] = result;
            numberOfVersions++;
          }
        }
      }
      //console.table(data);
      return data;
    });
  }
 });
}


export function findLRMViolations(project) {

return getJSON('/api/project_analyses/search', {
  project: project.key,
  p: 1,
  ps: 500,
}).then(function (responseAnalyses) {
  const numberOfAnalyses = responseAnalyses.analyses.length;
  if (numberOfAnalyses > 0) {
    return getJSON('/api/measures/search_history', {
      component: project.key,
      metrics: "lngprt-lrm-source-violations,lngprt-lrm-src-violations-count-ratio,lngprt-lrm-source-rci,lngprt-lrm-source-violations-distribution",
      ps: 1000
    }).then(function (responseMetrics) {
      var data = [];
      var numberOfVersions=0;

      for (let i = 0; i < numberOfAnalyses; i++) {
        let analysis = responseAnalyses.analyses[i];
        for (let j = 0; j < analysis.events.length; j++) {
          if (analysis.events[j].category === "VERSION") {
            let result = {version: analysis.events[j].name,
                          violation: "0", ratio: "", rci: "0", distribution: "",project: project.key
                         };
            const numberOfMeasuresRetrieved = 4;

            for (let k = 0; k < numberOfMeasuresRetrieved; k++) {
              for(let d = 0; d < responseMetrics.measures[k].history.length; d++) {
                if ( responseMetrics.measures[k].history[d].date === responseAnalyses.analyses[i].date ) {
                  //console.log(responseMetrics.measures[k].metric);
                  if (responseMetrics.measures[k].metric === "lngprt-lrm-source-violations") {
                    result.violation = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-src-violations-count-ratio") {
                    result.ratio = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-source-rci") {
                    result.rci = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-source-violations-distribution") {
                    result.distribution = responseMetrics.measures[k].history[d].value;
                  }
                }
              }
            }

            data[numberOfVersions] = result;
            numberOfVersions++;
          }
        }
      }
      //console.table(data);
      return data;
    });
  }
 });
}


export function findTraLRMViolations(project) {

return getJSON('/api/project_analyses/search', {
  project: project.key,
  p: 1,
  ps: 500,
}).then(function (responseAnalyses) {
  const numberOfAnalyses = responseAnalyses.analyses.length;
  if (numberOfAnalyses > 0) {
    return getJSON('/api/measures/search_history', {
      component: project.key,
      metrics: "lngprt-lrm-translation-violations,lngprt-lrm-tran-violations-count-ratio,lngprt-lrm-translation-rci,lngprt-lrm-translation-violations-distribution",
      ps: 1000
    }).then(function (responseMetrics) {
      var data = [];
      var numberOfVersions=0;

      for (let i = 0; i < numberOfAnalyses; i++) {
        let analysis = responseAnalyses.analyses[i];
        for (let j = 0; j < analysis.events.length; j++) {
          if (analysis.events[j].category === "VERSION") {
            let result = {version: analysis.events[j].name,
                          violation: "0", ratio: "", rci: "0", distribution: "",project: project.key
                         };
            const numberOfMeasuresRetrieved = 4;

            for (let k = 0; k < numberOfMeasuresRetrieved; k++) {
              for(let d = 0; d < responseMetrics.measures[k].history.length; d++) {
                if ( responseMetrics.measures[k].history[d].date === responseAnalyses.analyses[i].date ) {
                  //console.log(responseMetrics.measures[k].metric);
                  if (responseMetrics.measures[k].metric === "lngprt-lrm-translation-violations") {
                    result.violation = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-tran-violations-count-ratio") {
                    result.ratio = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-translation-rci") {
                    result.rci = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-translation-violations-distribution") {
                    result.distribution = responseMetrics.measures[k].history[d].value;
                  }
                }
              }
            }

            data[numberOfVersions] = result;
            numberOfVersions++;
          }
        }
      }
      //console.table(data);
      return data;
    });
  }
 });
}


export function findLrmCompletion(project) {

return getJSON('/api/project_analyses/search', {
  project: project.key,
  p: 1,
  ps: 500,
}).then(function (responseAnalyses) {
  const numberOfAnalyses = responseAnalyses.analyses.length;
  if (numberOfAnalyses > 0) {
    return getJSON('/api/measures/search_history', {
      component: project.key,
      metrics: "lngprt-lrm-status-total-source-files,lngprt-lrm-status-total-source-keys,lngprt-lrm-status-total-source-words,lngprt-lrm-status-last-version-num,lngprt-lrm-status-non-base-locales-ids,lngprt-lrm-status-non-base-locales-display,lngprt-lrm-num-files-to-translate-for-locales,lngprt-lrm-num-keys-to-translate-for-locales,lngprt-lrm-num-words-to-translate-for-locales,lngprt-lrm-is-outstanding-prepkits,lngprt-lrm-percent-complete-for-locales,lngprt-lrm-status-avg-completion-percent,lngprt-lrm-status-total-remaining-words,lngprt-lrm-default-locale",
      ps: 1000
    }).then(function (responseMetrics) {
      var data = [];
      var numberOfVersions=0;

      for (let i = 0; i < numberOfAnalyses; i++) {
        let analysis = responseAnalyses.analyses[i];
        for (let j = 0; j < analysis.events.length; j++) {
          if (analysis.events[j].category === "VERSION") {
            let result = {version: analysis.events[j].name,
                          files: "0", keys: "", words: "0", versionnum: "",project: project.key,d_local:"",ids:"",display:"",tfiles:"",tkeys:"",twords:"",percent:"",
                         };
            const numberOfMeasuresRetrieved = 14;

            for (let k = 0; k < numberOfMeasuresRetrieved; k++) {
              for(let d = 0; d < responseMetrics.measures[k].history.length; d++) {
                if ( responseMetrics.measures[k].history[d].date === responseAnalyses.analyses[i].date ) {
                  //console.log(responseMetrics.measures[k].metric);
                  if (responseMetrics.measures[k].metric === "lngprt-lrm-status-total-source-files") {
                    result.files = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-status-total-source-keys") {
                    result.keys = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-status-last-version-num") {
                    result.versionnum = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-status-total-source-words") {
                    result.words = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-default-locale") {
                    result.d_local = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-status-non-base-locales-ids") {
                    result.ids = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-status-non-base-locales-display") {
                    result.display = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-num-files-to-translate-for-locales") {
                    result.tfiles = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-num-keys-to-translate-for-locales") {
                    result.tkeys = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-num-words-to-translate-for-locales") {
                    result.twords = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-percent-complete-for-locales") {
                    result.percent = responseMetrics.measures[k].history[d].value;
                  }
                }
              }
            }

            data[numberOfVersions] = result;
            numberOfVersions++;
          }
        }
      }
      //console.table(data);
      return data;
    });
  }
 });
}


export function findLrmProductivity(project) {

return getJSON('/api/project_analyses/search', {
  project: project.key,
  p: 1,
  ps: 500,
}).then(function (responseAnalyses) {
  const numberOfAnalyses = responseAnalyses.analyses.length;
  if (numberOfAnalyses > 0) {
    return getJSON('/api/measures/search_history', {
      component: project.key,
      metrics: "lngprt-lrm-status-total-source-files,lngprt-lrm-status-total-source-keys,lngprt-lrm-status-total-source-words,lngprt-lrm-status-last-version-num,lngprt-lrm-status-non-base-locales-ids,lngprt-lrm-status-non-base-locales-display,lngprt-lrm-default-locale,lngprt-lrm-num-words-per-day-for-locales,lngprt-lrm-num-words-to-translate-for-locales",
      ps: 1000
    }).then(function (responseMetrics) {
      var data = [];
      var numberOfVersions=0;

      for (let i = 0; i < numberOfAnalyses; i++) {
        let analysis = responseAnalyses.analyses[i];
        for (let j = 0; j < analysis.events.length; j++) {
          if (analysis.events[j].category === "VERSION") {
            let result = {version: analysis.events[j].name,
                          files: "0", keys: "", words: "0", versionnum: "",d_local:"",ids:"",display:"",numWordsToTranslate:"",twords:"",
                         };
            const numberOfMeasuresRetrieved = 9;

            for (let k = 0; k < numberOfMeasuresRetrieved; k++) {
              for(let d = 0; d < responseMetrics.measures[k].history.length; d++) {
                if ( responseMetrics.measures[k].history[d].date === responseAnalyses.analyses[i].date ) {
                  //console.log(responseMetrics.measures[k].metric);
                  if (responseMetrics.measures[k].metric === "lngprt-lrm-status-total-source-files") {
                    result.files = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-status-total-source-keys") {
                    result.keys = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-status-last-version-num") {
                    result.versionnum = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-status-total-source-words") {
                    result.words = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-default-locale") {
                    result.d_local = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-status-non-base-locales-ids") {
                    result.ids = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-status-non-base-locales-display") {
                    result.display = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-num-words-to-translate-for-locales") {
                    result.numWordsToTranslate = responseMetrics.measures[k].history[d].value;
                  }else if (responseMetrics.measures[k].metric === "lngprt-lrm-num-words-per-day-for-locales") {
                    result.twords = responseMetrics.measures[k].history[d].value;
                  }
                }
              }
            }

            data[numberOfVersions] = result;
            numberOfVersions++;
          }
        }
      }
      //console.table(data);
      return data;
    });
  }
 });
}
