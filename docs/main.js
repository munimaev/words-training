/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/constants.ts":
/*!**********************************!*\
  !*** ./src/scripts/constants.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "consts": () => (/* binding */ consts)
/* harmony export */ });
var consts = {
  animationLength: 400,
  animationPuase: 100,
  failPuaseLength: 1000
};

/***/ }),

/***/ "./src/scripts/models/history-model.ts":
/*!*********************************************!*\
  !*** ./src/scripts/models/history-model.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HistoryModel": () => (/* binding */ HistoryModel)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var HistoryModel = /*#__PURE__*/function () {
  function HistoryModel() {
    _classCallCheck(this, HistoryModel);
    _defineProperty(this, "storagKey", "state");
  }
  _createClass(HistoryModel, [{
    key: "restore",
    value: function restore(tasks, progress) {
      tasks.filter(function (task) {
        return task.status !== "pending";
      }).forEach(function (task, i) {
        var historyProgress = _objectSpread(_objectSpread({}, progress), {}, {
          taskNumber: i + 1
        });
        if (i === 0) {
          history.replaceState({
            task: task,
            progress: historyProgress
          }, "");
        } else {
          history.pushState({
            task: task,
            progress: historyProgress
          }, "");
        }
      });
    }
  }, {
    key: "saveToStore",
    value: function saveToStore(tasks, progress) {
      var state = {
        tasks: tasks,
        progress: progress
      };
      localStorage.setItem(this.storagKey, JSON.stringify(state));
    }
  }, {
    key: "getFromStore",
    value: function getFromStore() {
      var stateString = localStorage.getItem(this.storagKey);
      if (stateString) {
        try {
          var state = JSON.parse(stateString);
          return state;
        } catch (error) {
          return null;
        }
      }
      return null;
    }
  }, {
    key: "getProgress",
    value: function getProgress(currentTask) {
      var _history$state, _history$state2;
      var historyTask = (_history$state = history.state) === null || _history$state === void 0 ? void 0 : _history$state.task;
      var historyProgress = (_history$state2 = history.state) === null || _history$state2 === void 0 ? void 0 : _history$state2.progress;
      if (historyProgress && historyTask && currentTask && historyTask.id !== currentTask.id) {
        return historyProgress;
      }
      return null;
    }
  }, {
    key: "getTask",
    value: function getTask(currentTask) {
      var _history$state3;
      var historyTask = (_history$state3 = history.state) === null || _history$state3 === void 0 ? void 0 : _history$state3.task;
      if (historyTask && historyTask.id !== currentTask.id) {
        return historyTask;
      }
      return currentTask;
    }
  }, {
    key: "clearStore",
    value: function clearStore() {
      localStorage.removeItem(this.storagKey);
    }
  }]);
  return HistoryModel;
}();

/***/ }),

/***/ "./src/scripts/models/models.ts":
/*!**************************************!*\
  !*** ./src/scripts/models/models.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Model": () => (/* binding */ Model)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/scripts/constants.ts");
/* harmony import */ var _history_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./history-model */ "./src/scripts/models/history-model.ts");
/* harmony import */ var _tasks_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tasks-model */ "./src/scripts/models/tasks-model.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



var Model = /*#__PURE__*/function () {
  function Model(customEvents) {
    _classCallCheck(this, Model);
    _defineProperty(this, "trainingLength", 6);
    _defineProperty(this, "maxErrorCount", 3);
    this.customEvents = customEvents;
    this.tasks = new _tasks_model__WEBPACK_IMPORTED_MODULE_2__.TasksModel(this.trainingLength);
    this.historyModel = new _history_model__WEBPACK_IMPORTED_MODULE_1__.HistoryModel();
  }
  _createClass(Model, [{
    key: "restoreOrStart",
    value: function restoreOrStart() {
      this.customEvents.dispatchEvent("updateCounter");
      if (this.historyModel.getFromStore()) {
        this.customEvents.dispatchEvent("updateRestore");
      } else {
        this.start();
      }
    }
  }, {
    key: "start",
    value: function start() {
      if (history.state !== null) {
        history.pushState(null, "");
      }
      this.tasks.start();
      this.updateAllViewAndCloseModal();
      this.historyModel.clearStore();
    }
  }, {
    key: "restore",
    value: function restore() {
      var state = this.historyModel.getFromStore();
      if (state) {
        this.tasks.restore(state.tasks);
        this.historyModel.restore(state.tasks, state.progress);
      }
      this.updateAllViewAndCloseModal();
    }
  }, {
    key: "updateAllViewAndCloseModal",
    value: function updateAllViewAndCloseModal() {
      this.customEvents.dispatchEvent("updateCounter");
      this.customEvents.dispatchEvent("updateTask");
      this.customEvents.dispatchEvent("closeModal");
    }
  }, {
    key: "getTaskToDisplay",
    value: function getTaskToDisplay() {
      var currentTask = this.tasks.getCurrent();
      return this.historyModel.getTask(currentTask);
    }
  }, {
    key: "getProgressToDisplay",
    value: function getProgressToDisplay() {
      var currentTask = this.tasks.getCurrent();
      return this.historyModel.getProgress(currentTask) || this.tasks.getProgress();
    }
  }, {
    key: "getResults",
    value: function getResults() {
      return this.tasks.getResults();
    }
  }, {
    key: "select",
    value: function select(id) {
      var _this$tasks$getCurren = this.tasks.getCurrent(),
        solved = _this$tasks$getCurren.solved,
        letters = _this$tasks$getCurren.letters;
      var selected = letters.find(function (letter) {
        return letter.id === id;
      });
      if (!selected) {
        return;
      }
      if (this.tasks.isSelectionCorrect(selected.value)) {
        this.updateTaskAndSave({
          letters: letters.filter(function (letter) {
            return letter.id !== id;
          }),
          solved: [].concat(_toConsumableArray(solved), [selected])
        });
        this.customEvents.dispatchEvent("updateTask");
        this.moveNextIfCurrentIsSolved();
      } else {
        this.increaseErrorCount(id);
      }
    }
  }, {
    key: "enter",
    value: function enter(symbol) {
      if (this.tasks.isHasNoRoomForError(this.maxErrorCount)) {
        return;
      }
      if (this.tasks.isSelectionCorrect(symbol)) {
        this.pushSymbolsToSolved(symbol);
        this.customEvents.dispatchEvent("updateTask");
        this.moveNextIfCurrentIsSolved();
      } else {
        var letterId = this.tasks.getLetterIdBySymbol(symbol);
        this.increaseErrorCount(letterId);
      }
    }
  }, {
    key: "increaseErrorCount",
    value: function increaseErrorCount(letterId) {
      var task = this.tasks.getCurrent();
      this.updateTaskAndSave({
        errorCount: task.errorCount + 1
      });
      if (task.errorCount >= this.maxErrorCount) {
        this.showAnswerOnFail();
      } else if (letterId) {
        this.customEvents.dispatchEvent("error", letterId);
      }
    }
  }, {
    key: "showAnswerOnFail",
    value: function showAnswerOnFail() {
      this.updateTaskAndSave({
        status: "failed"
      });
      this.pushSymbolsToSolved();
      this.customEvents.dispatchEvent("updateTask");
      this.moveToNextTask(_constants__WEBPACK_IMPORTED_MODULE_0__.consts.failPuaseLength);
    }
  }, {
    key: "pushSymbolsToSolved",
    value: function pushSymbolsToSolved(symbols) {
      var result = this.tasks.pushSymbolsInCurrent(symbols);
      this.updateTaskAndSave(result);
    }
  }, {
    key: "moveNextIfCurrentIsSolved",
    value: function moveNextIfCurrentIsSolved() {
      if (this.tasks.isCurrentSolved()) {
        this.updateTaskAndSave({
          status: "success"
        });
        this.moveToNextTask();
      }
    }
  }, {
    key: "moveToNextTask",
    value: function moveToNextTask() {
      var _this = this;
      var timeOut = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var nextTaskIndex = this.tasks.getIndex() + 1;
      var task = this.tasks.getCurrent();
      var progress = this.tasks.getProgress();
      if (nextTaskIndex >= this.tasks.getTotal()) {
        setTimeout(function () {
          history.replaceState({
            task: task,
            progress: progress
          }, "");
          _this.moveToResult();
        }, timeOut);
      } else {
        setTimeout(function () {
          history.replaceState({
            task: task,
            progress: progress
          }, "");
          _this.tasks.setIndex(nextTaskIndex);
          _this.updateTaskAndSave({
            status: "started"
          });
          history.pushState({
            task: _this.tasks.getCurrent(),
            progress: _this.tasks.getProgress()
          }, "");
          _this.customEvents.dispatchEvent("updateTask");
          _this.customEvents.dispatchEvent("updateCounter");
        }, timeOut || _constants__WEBPACK_IMPORTED_MODULE_0__.consts.animationLength + _constants__WEBPACK_IMPORTED_MODULE_0__.consts.animationPuase);
      }
    }
  }, {
    key: "moveToResult",
    value: function moveToResult() {
      this.historyModel.clearStore();
      this.customEvents.dispatchEvent("updateResults");
    }
  }, {
    key: "updateTaskAndSave",
    value: function updateTaskAndSave(data) {
      this.tasks.updateCurrent(data);
      this.saveStateToStore();
    }
  }, {
    key: "saveStateToStore",
    value: function saveStateToStore() {
      this.historyModel.saveToStore(this.tasks.get(), this.tasks.getProgress());
    }
  }, {
    key: "history",
    value: function history() {
      this.updateAllViewAndCloseModal();
    }
  }]);
  return Model;
}();


/***/ }),

/***/ "./src/scripts/models/tasks-model.ts":
/*!*******************************************!*\
  !*** ./src/scripts/models/tasks-model.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TasksModel": () => (/* binding */ TasksModel)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/scripts/utils.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var TasksModel = /*#__PURE__*/function () {
  function TasksModel(trainingLength) {
    _classCallCheck(this, TasksModel);
    _defineProperty(this, "tasks", []);
    _defineProperty(this, "currentTask", 0);
    _defineProperty(this, "trainingLength", 6);
    this.trainingLength = trainingLength;
  }
  _createClass(TasksModel, [{
    key: "get",
    value: function get() {
      return this.tasks;
    }
  }, {
    key: "getCurrent",
    value: function getCurrent() {
      return this.tasks[this.currentTask];
    }
  }, {
    key: "getIndex",
    value: function getIndex() {
      return this.currentTask;
    }
  }, {
    key: "getTotal",
    value: function getTotal() {
      return this.tasks.length;
    }
  }, {
    key: "setIndex",
    value: function setIndex(index) {
      this.currentTask = index;
    }
  }, {
    key: "getCountOfStarted",
    value: function getCountOfStarted() {
      return this.tasks.filter(function (task) {
        return task.status !== "pending";
      }).length;
    }
  }, {
    key: "getProgress",
    value: function getProgress() {
      return {
        taskNumber: this.getIndex() + 1,
        trainingLength: this.getTotal() || this.trainingLength
      };
    }
  }, {
    key: "getResults",
    value: function getResults() {
      var result = {
        wordsWithoutErrors: 0,
        errorCount: 0,
        wordWithMostWrrors: null
      };
      var maxErrorCount = 0;
      this.tasks.forEach(function (task) {
        if (task.errorCount) {
          result.errorCount += task.errorCount;
          if (task.errorCount > maxErrorCount) {
            result.wordWithMostWrrors = task.answer;
            maxErrorCount = task.errorCount;
          }
        } else {
          result.wordsWithoutErrors += 1;
        }
      });
      return result;
    }
  }, {
    key: "getLetterIdBySymbol",
    value: function getLetterIdBySymbol(symbol) {
      var _this$getCurrent = this.getCurrent(),
        letters = _this$getCurrent.letters;
      var letter = letters.find(function (letter) {
        return letter.value === symbol;
      });
      return letter ? letter.id : null;
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;
      var trainingId = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getRandomId)();
      var words = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getRandomWords)(this.trainingLength);
      this.tasks = words.map(function (word) {
        return _this.createTaskFromWord(trainingId, word);
      });
      this.currentTask = 0;
    }
  }, {
    key: "createTaskFromWord",
    value: function createTaskFromWord(trainingId, word) {
      var letters = this.convertWordToLetters(word);
      return {
        id: "".concat(trainingId, "_").concat(word),
        answer: word,
        solved: [],
        letters: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.shuffle)(letters),
        errorCount: 0,
        status: "pending"
      };
    }
  }, {
    key: "convertWordToLetters",
    value: function convertWordToLetters(word) {
      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      return word.split("").map(function (letter, i) {
        return {
          id: prefix + "".concat(letter.charCodeAt(0), "_").concat(i),
          value: letter
        };
      });
    }
  }, {
    key: "restore",
    value: function restore(tasks) {
      this.tasks = tasks;
      this.currentTask = this.getCountOfStarted() - 1;
    }
  }, {
    key: "updateCurrent",
    value: function updateCurrent(data) {
      var task = this.getCurrent();
      if (data.solved) {
        task.solved = data.solved;
      }
      if (data.letters) {
        task.letters = data.letters;
      }
      if (data.errorCount !== undefined) {
        task.errorCount = data.errorCount;
      }
      if (data.status) {
        task.status = data.status;
      }
    }
  }, {
    key: "isSelectionCorrect",
    value: function isSelectionCorrect(symbol) {
      var task = this.getCurrent();
      var expected = task.answer[task.solved.length];
      return symbol === expected;
    }
  }, {
    key: "pushSymbolsInCurrent",
    value: function pushSymbolsInCurrent(symbols) {
      var task = this.getCurrent();
      var symbolsToPush = symbols || task.answer.substring(task.solved.length);
      var letters = _toConsumableArray(task.letters);
      var solved = _toConsumableArray(task.solved);
      symbolsToPush.split("").forEach(function (symbol) {
        var index = letters.findIndex(function (letter) {
          return letter.value === symbol;
        });
        var letter = letters.splice(index, 1)[0];
        solved.push(letter);
      });
      return {
        solved: solved,
        letters: letters
      };
    }
  }, {
    key: "isCurrentSolved",
    value: function isCurrentSolved() {
      var task = this.getCurrent();
      return task.solved.length === task.answer.length;
    }
  }, {
    key: "isHasNoRoomForError",
    value: function isHasNoRoomForError(maxErrorCount) {
      var task = this.getCurrent();
      if (!task || task.errorCount >= maxErrorCount) {
        return true;
      }
      return false;
    }
  }]);
  return TasksModel;
}();

/***/ }),

/***/ "./src/scripts/presenter.ts":
/*!**********************************!*\
  !*** ./src/scripts/presenter.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Presenter": () => (/* binding */ Presenter)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var Presenter = /*#__PURE__*/_createClass(function Presenter(model, view, customEvents) {
  _classCallCheck(this, Presenter);
  this.model = model;
  this.view = view;
  this.customEvents = customEvents;
  this.view.addSelectLetterHandler(function (id) {
    model.select(id);
  });
  this.view.addEnterLetterHandler(function (symbol) {
    model.enter(symbol);
  });
  this.view.addHistoryHandler(function () {
    model.history();
  });
  this.view.addModalButtonHandler(function (id) {
    switch (id) {
      case "restart":
        model.start();
        break;
      case "restore":
        model.restore();
        break;
      case "close":
        view.closeModal();
        break;
      default:
        throw new Error("Unexpected modal action id: ".concat(id));
    }
  });
  this.customEvents.registerEvent("updateTask", function () {
    view.updateTaskView(model.getTaskToDisplay());
  });
  this.customEvents.registerEvent("updateResults", function () {
    view.updateResultView(model.getResults(), true);
  });
  this.customEvents.registerEvent("updateRestore", function () {
    view.updateRestoreView(true);
  });
  this.customEvents.registerEvent("updateCounter", function () {
    view.updateCountView(model.getProgressToDisplay());
  });
  this.customEvents.registerEvent("error", function (id) {
    view.error(id);
  });
  this.customEvents.registerEvent("closeModal", function () {
    view.closeModal();
  });
  this.model.restoreOrStart();
});


/***/ }),

/***/ "./src/scripts/utils.ts":
/*!******************************!*\
  !*** ./src/scripts/utils.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomEvent": () => (/* binding */ CustomEvent),
/* harmony export */   "Reactor": () => (/* binding */ EventResolver),
/* harmony export */   "getRandomId": () => (/* binding */ getRandomId),
/* harmony export */   "getRandomWords": () => (/* binding */ getRandomWords),
/* harmony export */   "shuffle": () => (/* binding */ shuffle)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var CustomEvent = /*#__PURE__*/function () {
  function CustomEvent(name) {
    _classCallCheck(this, CustomEvent);
    _defineProperty(this, "callbacks", []);
    this.name = name;
  }
  _createClass(CustomEvent, [{
    key: "registerCallback",
    value: function registerCallback(callback) {
      this.callbacks.push(callback);
    }
  }]);
  return CustomEvent;
}();
var EventResolver = /*#__PURE__*/function () {
  function EventResolver() {
    _classCallCheck(this, EventResolver);
    _defineProperty(this, "events", {});
  }
  _createClass(EventResolver, [{
    key: "registerEvent",
    value: function registerEvent(eventName, callback) {
      var event = new CustomEvent(eventName);
      this.events[eventName] = event;
      if (callback) {
        this.addEventListener(eventName, callback);
      }
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(eventName, callback) {
      this.events[eventName].registerCallback(callback);
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(eventName) {
      var eventArgs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      this.events[eventName].callbacks.forEach(function (callback) {
        callback(eventArgs);
      });
    }
  }]);
  return EventResolver;
}();

var list = ["apple", "function", "timeout", "task", "application", "data", "tragedy", "sun", "symbol", "button", "software"];
function shuffle(arr) {
  var result = _toConsumableArray(arr);
  var current = arr.length;
  var random;
  while (current != 0) {
    random = Math.floor(Math.random() * current);
    current--;
    var _ref = [result[random], result[current]];
    result[current] = _ref[0];
    result[random] = _ref[1];
  }
  return result;
}
function getRandomWords(count) {
  return shuffle(list).slice(0, count);
}
function getRandomId() {
  return new Date().getTime();
}

/***/ }),

/***/ "./src/scripts/views/button-view.ts":
/*!******************************************!*\
  !*** ./src/scripts/views/button-view.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ButtonView": () => (/* binding */ ButtonView)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/scripts/constants.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var ButtonView = /*#__PURE__*/function () {
  function ButtonView(letter) {
    _classCallCheck(this, ButtonView);
    _defineProperty(this, "status", "primary");
    this.element = document.createElement("button");
    this.element.setAttribute("type", "button");
    this.element.setAttribute("data-index", letter.id);
    this.element.className = "btn";
    var animationLength = _constants__WEBPACK_IMPORTED_MODULE_0__.consts.animationLength / 100;
    this.element.style.cssText = "width: 42px; margin: 3px; transition-property: all; transition-duration: 0.".concat(animationLength, "s;");
    this.element.innerText = letter.value;
  }
  _createClass(ButtonView, [{
    key: "getElement",
    value: function getElement() {
      return this.element;
    }
  }, {
    key: "updateClasses",
    value: function updateClasses(className) {
      var _this = this;
      if (this.element.className === "btn") {
        this.element.classList.add(className);
      } else {
        setTimeout(function () {
          _this.element.className = "btn ".concat(className);
        }, 0);
      }
    }
  }, {
    key: "makePrimary",
    value: function makePrimary() {
      this.status = "primary";
      this.updateClasses("btn-primary");
    }
  }, {
    key: "makeSuccess",
    value: function makeSuccess() {
      this.status = "success";
      this.updateClasses("btn-success");
    }
  }, {
    key: "makeError",
    value: function makeError() {
      var _this2 = this;
      this.updateClasses("btn-danger");
      setTimeout(function () {
        if (_this2.status !== "failed") {
          _this2.updateClasses("btn-primary");
        }
      }, _constants__WEBPACK_IMPORTED_MODULE_0__.consts.animationLength);
    }
  }, {
    key: "makeFailed",
    value: function makeFailed() {
      this.status = "failed";
      this.updateClasses("btn-danger");
    }
  }]);
  return ButtonView;
}();

/***/ }),

/***/ "./src/scripts/views/counter-view.ts":
/*!*******************************************!*\
  !*** ./src/scripts/views/counter-view.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CounterView": () => (/* binding */ CounterView)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var CounterView = /*#__PURE__*/function () {
  function CounterView() {
    _classCallCheck(this, CounterView);
    this.currentQuestion = document.getElementById("current_question");
    this.totalQuestions = document.getElementById("total_questions");
  }
  _createClass(CounterView, [{
    key: "updateView",
    value: function updateView(current, total) {
      this.currentQuestion.innerText = String(current);
      this.totalQuestions.innerText = String(total);
    }
  }]);
  return CounterView;
}();

/***/ }),

/***/ "./src/scripts/views/modal-view.ts":
/*!*****************************************!*\
  !*** ./src/scripts/views/modal-view.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModalView": () => (/* binding */ ModalView)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/scripts/constants.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var ModalView = /*#__PURE__*/function () {
  function ModalView() {
    _classCallCheck(this, ModalView);
    _defineProperty(this, "show", false);
    _defineProperty(this, "handler", null);
    this.wrapper = this.createWrapper();
    this.title = this.createTitle();
    this.body = this.createBody();
    this.footer = this.createFooter();
    this.modal = this.createModal();
  }
  _createClass(ModalView, [{
    key: "createWrapper",
    value: function createWrapper() {
      var wrapper = document.createElement("div");
      wrapper.className = "modal-backdrop fade";
      return wrapper;
    }
  }, {
    key: "createTitle",
    value: function createTitle() {
      var title = document.createElement("h5");
      title.className = "modal-title";
      return title;
    }
  }, {
    key: "createBody",
    value: function createBody() {
      var body = document.createElement("div");
      body.className = "modal-body";
      return body;
    }
  }, {
    key: "createFooter",
    value: function createFooter() {
      var footer = document.createElement("div");
      footer.className = "modal-footer";
      return footer;
    }
  }, {
    key: "createModal",
    value: function createModal() {
      var modal = document.createElement("div");
      modal.className = "modal fade";
      modal.style.cssText = "display: block";
      var dialog = document.createElement("div");
      dialog.className = "modal-dialog  modal-dialog-centered";
      var content = document.createElement("div");
      content.className = "modal-content";
      var header = document.createElement("div");
      header.className = "modal-header";
      modal.append(dialog);
      dialog.append(content);
      content.append(header);
      header.append(this.title);
      content.append(this.body);
      content.append(this.footer);
      return modal;
    }
  }, {
    key: "open",
    value: function open() {
      var _this = this;
      if (!this.show) {
        this.show = true;
        document.body.append(this.modal);
        document.body.append(this.wrapper);
        setTimeout(function () {
          _this.wrapper.classList.add("show");
          _this.modal.classList.add("show");
        }, _constants__WEBPACK_IMPORTED_MODULE_0__.consts.animationPuase);
      }
    }
  }, {
    key: "close",
    value: function close() {
      var _this2 = this;
      if (this.show) {
        this.show = false;
        this.wrapper.classList.remove("show");
        this.modal.classList.remove("show");
        setTimeout(function () {
          var _this2$wrapper$parent, _this2$modal$parentEl;
          (_this2$wrapper$parent = _this2.wrapper.parentElement) === null || _this2$wrapper$parent === void 0 ? void 0 : _this2$wrapper$parent.removeChild(_this2.wrapper);
          (_this2$modal$parentEl = _this2.modal.parentElement) === null || _this2$modal$parentEl === void 0 ? void 0 : _this2$modal$parentEl.removeChild(_this2.modal);
        }, _constants__WEBPACK_IMPORTED_MODULE_0__.consts.animationLength);
      }
    }
  }, {
    key: "updateView",
    value: function updateView(model) {
      var _this3 = this;
      this.title.innerHTML = model.title;
      this.body.innerHTML = model.body;
      this.footer.innerHTML = "";
      model.buttons.forEach(function (button) {
        _this3.footer.append(_this3.createButton(button));
      });
      this.open();
    }
  }, {
    key: "createButton",
    value: function createButton(model) {
      var _this4 = this;
      var button = document.createElement("button");
      button.setAttribute("type", "button");
      button.className = model.type === "accept" ? "btn btn-primary" : "btn";
      button.innerText = model.text;
      button.addEventListener("click", function () {
        _this4.handler && _this4.handler(model.id);
      });
      return button;
    }
  }, {
    key: "addButtonHandler",
    value: function addButtonHandler(handler) {
      this.handler = handler;
    }
  }]);
  return ModalView;
}();

/***/ }),

/***/ "./src/scripts/views/restore-view.ts":
/*!*******************************************!*\
  !*** ./src/scripts/views/restore-view.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RestorelView": () => (/* binding */ RestorelView)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var RestorelView = /*#__PURE__*/function () {
  function RestorelView(modal) {
    _classCallCheck(this, RestorelView);
    this.modal = modal;
  }
  _createClass(RestorelView, [{
    key: "updateView",
    value: function updateView(open) {
      if (open) {
        this.modal.updateView({
          title: "Restore training?",
          body: "<p>Do you want to continue the last training?</p>",
          buttons: [{
            text: "Close",
            id: "restart",
            type: "reject"
          }, {
            text: "Restore",
            id: "restore",
            type: "accept"
          }]
        });
      } else {
        this.modal.close();
      }
    }
  }]);
  return RestorelView;
}();

/***/ }),

/***/ "./src/scripts/views/result-view.ts":
/*!******************************************!*\
  !*** ./src/scripts/views/result-view.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ResultlView": () => (/* binding */ ResultlView)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ResultlView = /*#__PURE__*/function () {
  function ResultlView(modal) {
    _classCallCheck(this, ResultlView);
    this.modal = modal;
  }
  _createClass(ResultlView, [{
    key: "updateView",
    value: function updateView(result) {
      var open = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (result && open) {
        var wordWithMostWrrors = result.wordWithMostWrrors || "—";
        this.modal.updateView({
          title: "Training result",
          body: "<p>Number of words without errors: ".concat(result.wordsWithoutErrors, "</p>\n        <p>Number of errors: ").concat(result.errorCount, "</p>\n        <p>The word with the most errors: ").concat(wordWithMostWrrors, "</p>"),
          buttons: [{
            text: "Try again",
            id: "restart",
            type: "accept"
          }]
        });
      } else {
        this.modal.close;
      }
    }
  }]);
  return ResultlView;
}();

/***/ }),

/***/ "./src/scripts/views/task-view.ts":
/*!****************************************!*\
  !*** ./src/scripts/views/task-view.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TaskView": () => (/* binding */ TaskView)
/* harmony export */ });
/* harmony import */ var _button_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./button-view */ "./src/scripts/views/button-view.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var TaskView = /*#__PURE__*/function () {
  function TaskView() {
    _classCallCheck(this, TaskView);
    _defineProperty(this, "buttons", new Map());
    _defineProperty(this, "taskId", null);
    this.lettersWrapper = document.getElementById("letters");
    this.answerWrapper = document.getElementById("answer");
  }
  _createClass(TaskView, [{
    key: "updateView",
    value: function updateView(task) {
      if (this.taskId !== task.id) {
        this.taskId = task.id;
        this.deletButtons();
        this.createButtons(task);
      } else {
        this.detachButtons();
      }
      this.updateButtonsView(task);
    }
  }, {
    key: "deletButtons",
    value: function deletButtons() {
      this.answerWrapper.innerHTML = "";
      this.lettersWrapper.innerHTML = "";
      this.buttons = new Map();
    }
  }, {
    key: "createButtons",
    value: function createButtons(task) {
      var _this = this;
      [].concat(_toConsumableArray(task.solved), _toConsumableArray(task.letters)).forEach(function (letter) {
        var button = new _button_view__WEBPACK_IMPORTED_MODULE_0__.ButtonView(letter);
        _this.buttons.set(letter.id, button);
      });
    }
  }, {
    key: "detachButtons",
    value: function detachButtons() {
      this.buttons.forEach(function (button) {
        var _element$parentElemen;
        var element = button.getElement();
        (_element$parentElemen = element.parentElement) === null || _element$parentElemen === void 0 ? void 0 : _element$parentElemen.removeChild(element);
      });
    }
  }, {
    key: "updateButtonsView",
    value: function updateButtonsView(task) {
      var _this2 = this;
      task.solved.forEach(function (letter) {
        var button = _this2.buttons.get(letter.id);
        if (!button) {
          return;
        }
        if (task.status === "failed") {
          button.makeFailed();
        } else {
          button.makeSuccess();
        }
        _this2.answerWrapper.append(button.getElement());
      });
      task.letters.forEach(function (letter) {
        var button = _this2.buttons.get(letter.id);
        if (button) {
          button.makePrimary();
          _this2.lettersWrapper.append(button.getElement());
        }
      });
    }
  }, {
    key: "error",
    value: function error(id) {
      var _this$buttons$get;
      (_this$buttons$get = this.buttons.get(id)) === null || _this$buttons$get === void 0 ? void 0 : _this$buttons$get.makeError();
    }
  }, {
    key: "addSelectLetterHandler",
    value: function addSelectLetterHandler(handler) {
      this.lettersWrapper.addEventListener("click", function (event) {
        var target = event.target;
        var index = target.getAttribute("data-index");
        if (index) {
          handler(index);
        }
      });
    }
  }, {
    key: "addEnterLetterHandler",
    value: function addEnterLetterHandler(handler) {
      document.addEventListener("keydown", function (event) {
        var symbol = event.key.toLocaleLowerCase();
        if (/^[a-z]$/.test(symbol) && !event.metaKey && !event.ctrlKey) {
          handler(symbol);
        }
      });
    }
  }]);
  return TaskView;
}();

/***/ }),

/***/ "./src/scripts/views/views.ts":
/*!************************************!*\
  !*** ./src/scripts/views/views.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "View": () => (/* binding */ View)
/* harmony export */ });
/* harmony import */ var _counter_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./counter-view */ "./src/scripts/views/counter-view.ts");
/* harmony import */ var _modal_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal-view */ "./src/scripts/views/modal-view.ts");
/* harmony import */ var _restore_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./restore-view */ "./src/scripts/views/restore-view.ts");
/* harmony import */ var _result_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./result-view */ "./src/scripts/views/result-view.ts");
/* harmony import */ var _task_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./task-view */ "./src/scripts/views/task-view.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }





var View = /*#__PURE__*/function () {
  function View() {
    _classCallCheck(this, View);
    _defineProperty(this, "buttons", new Map());
    this.task = new _task_view__WEBPACK_IMPORTED_MODULE_4__.TaskView();
    this.counter = new _counter_view__WEBPACK_IMPORTED_MODULE_0__.CounterView();
    this.modal = new _modal_view__WEBPACK_IMPORTED_MODULE_1__.ModalView();
    this.result = new _result_view__WEBPACK_IMPORTED_MODULE_3__.ResultlView(this.modal);
    this.restore = new _restore_view__WEBPACK_IMPORTED_MODULE_2__.RestorelView(this.modal);
  }
  _createClass(View, [{
    key: "updateCountView",
    value: function updateCountView(progress) {
      this.counter.updateView(progress.taskNumber, progress.trainingLength);
    }
  }, {
    key: "updateTaskView",
    value: function updateTaskView(task) {
      this.task.updateView(task);
    }
  }, {
    key: "error",
    value: function error(id) {
      this.task.error(id);
    }
  }, {
    key: "addSelectLetterHandler",
    value: function addSelectLetterHandler(handler) {
      this.task.addSelectLetterHandler(handler);
    }
  }, {
    key: "addEnterLetterHandler",
    value: function addEnterLetterHandler(handler) {
      this.task.addEnterLetterHandler(handler);
    }
  }, {
    key: "updateResultView",
    value: function updateResultView(result, open) {
      this.result.updateView(result, open);
    }
  }, {
    key: "updateRestoreView",
    value: function updateRestoreView(open) {
      this.restore.updateView(open);
    }
  }, {
    key: "closeModal",
    value: function closeModal() {
      this.modal.close();
    }
  }, {
    key: "addModalButtonHandler",
    value: function addModalButtonHandler(handler) {
      this.modal.addButtonHandler(handler);
    }
  }, {
    key: "addHistoryHandler",
    value: function addHistoryHandler(handler) {
      window.addEventListener("popstate", function () {
        handler();
      });
    }
  }]);
  return View;
}();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scripts_models_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/models/models */ "./src/scripts/models/models.ts");
/* harmony import */ var _scripts_presenter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/presenter */ "./src/scripts/presenter.ts");
/* harmony import */ var _scripts_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/utils */ "./src/scripts/utils.ts");
/* harmony import */ var _scripts_views_views__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scripts/views/views */ "./src/scripts/views/views.ts");




var customEvents = new _scripts_utils__WEBPACK_IMPORTED_MODULE_2__.Reactor();
var model = new _scripts_models_models__WEBPACK_IMPORTED_MODULE_0__.Model(customEvents);
var view = new _scripts_views_views__WEBPACK_IMPORTED_MODULE_3__.View();
new _scripts_presenter__WEBPACK_IMPORTED_MODULE_1__.Presenter(model, view, customEvents);
})();

/******/ })()
;
//# sourceMappingURL=main.js.map