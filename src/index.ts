import { Model } from "./scripts/models/models";
import { Presenter } from "./scripts/presenter";
import { Reactor } from "./scripts/utils";
import { View } from "./scripts/views/views";

const customEvents = new Reactor();
const model = new Model(customEvents);
const view = new View();

new Presenter(model, view, customEvents);
