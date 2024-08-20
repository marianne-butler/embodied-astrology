import fs from 'fs';
import {Notion} from './sessions.js';
import path, { dirname } from 'node:path';

const notionParams = {}; // tag

const sessions = await Notion(notionParams);

fs.writeFileSync("public/data.json", JSON.stringify({test:"ok"}));