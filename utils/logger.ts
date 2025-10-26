export class Logger {
  private prefix: string;

  constructor(prefix: string = '') {
    this.prefix = prefix;
  }

  private formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}]${this.prefix ? ` [${this.prefix}]` : ''} ${message}`;
  }

  info(message: string): void {
    console.log(this.formatMessage('INFO', message));
  }

  warn(message: string): void {
    console.warn(this.formatMessage('WARN', message));
  }

  error(message: string, error?: Error): void {
    const errorMessage = error ? `${message} - ${error.message}` : message;
    console.error(this.formatMessage('ERROR', errorMessage));
    if (error && error.stack) {
      console.error(error.stack);
    }
  }

  step(message: string): void {
    console.log(this.formatMessage('STEP', message));
  }
}

export const logger = new Logger();
