declare var process: Process;

interface Process {
  env: Env;
}

interface Env {
  RESCUEGROUPS_KEY: string;
}

interface GlobalEnvironment {
  process: Process;
}
