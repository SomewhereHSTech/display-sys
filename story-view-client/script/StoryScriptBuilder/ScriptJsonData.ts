

export interface ScriptJsonData{
    type: string;
    text: string;
    url?: string;
}

export interface ScriptsJsonData {
    scripts: Array<ScriptJsonData>;
    hash: string;
    next_update: number;  // 更新する時のUNIX時間とかでどう？
}