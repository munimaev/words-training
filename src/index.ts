import { Model } from "./scripts/models";
import { Presenter } from "./scripts/presenter";
import { Reactor } from "./scripts/utils";
import { View } from "./scripts/views/views";

var customEvents = new Reactor();
var model = new Model(customEvents);
var view = new View();

new Presenter(model, view, customEvents);
