import {namespace} from "./use.json";
import importableConfig from "./exports/config";
import {loadPluginConfig} from "@xpresser/plugin-tools/src/Config";

const { pluginConfig, $ } = loadPluginConfig({
    namespace,
    type: "function",
    configFile: "abolish",
    default: importableConfig
});

export { pluginConfig, $ };
