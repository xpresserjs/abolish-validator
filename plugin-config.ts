import {namespace} from "./use.json";
import importableConfig from "./exports/config";
import {ConfigHelpers} from "@xpresser/plugin-tools";

const { pluginConfig, $ } = ConfigHelpers.loadPluginConfig({
    namespace,
    type: "function",
    configFile: "abolish",
    default: importableConfig
});

export { pluginConfig, $ };
