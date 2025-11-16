/**
 * Audit Logger - Structured logging for compliance and security
 *
 * Implementation of tooling for the TOON format specification.
 *
 * TOON Format:
 *   Copyright (c) 2025 Johann Schopplich
 *   https://github.com/toon-format/toon
 *   Licensed under the MIT License
 *
 * This Implementation:
 *   Copyright (c) 2025 William Finger
 *   Licensed under the MIT License
 *
 * Provides structured JSON logging with timestamps, action tracking,
 * and security-focused log sanitization for compliance auditing.
 */

const fs = require('fs');
const path = require('path');

// Log levels
const LogLevel = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  SECURITY: 'SECURITY',
  AUDIT: 'AUDIT'
};

// Error categories for better error handling
const ErrorCategory = {
  VALIDATION: 'VALIDATION_ERROR',
  SECURITY: 'SECURITY_ERROR',
  SYSTEM: 'SYSTEM_ERROR',
  IO: 'IO_ERROR'
};

/**
 * Sanitize log data to prevent exposure of sensitive information
 * @param {any} data - Data to sanitize
 * @returns {any} Sanitized data
 */
function sanitizeLogData(data) {
  if (typeof data === 'string') {
    // Remove potential file system paths that might expose system info
    return data.replace(/\/home\/[^/]+/g, '/home/***')
               .replace(/C:\\Users\\[^\\]+/g, 'C:\\Users\\***');
  }

  // Handle arrays before objects (arrays are objects in JavaScript)
  if (Array.isArray(data)) {
    return data.map(item => sanitizeLogData(item));
  }

  if (typeof data === 'object' && data !== null) {
    const sanitized = {};
    for (const [key, value] of Object.entries(data)) {
      // Skip potentially sensitive keys
      if (['password', 'token', 'secret', 'key'].includes(key.toLowerCase())) {
        sanitized[key] = '***REDACTED***';
      } else {
        sanitized[key] = sanitizeLogData(value);
      }
    }
    return sanitized;
  }

  return data;
}

/**
 * Create structured audit log entry
 * @param {string} level - Log level
 * @param {string} action - Action being performed
 * @param {string} status - Operation status (success, failure, started)
 * @param {object} details - Additional details
 * @returns {object} Structured log entry
 */
function createLogEntry(level, action, status, details = {}) {
  return {
    timestamp: new Date().toISOString(),
    level,
    action,
    status,
    process: 'toon-converter',
    details: sanitizeLogData(details)
  };
}

/**
 * Write audit log to file and console
 * @param {object} logEntry - Structured log entry
 */
function writeLog(logEntry) {
  // Write to console for real-time monitoring
  const consoleMessage = formatConsoleMessage(logEntry);

  switch (logEntry.level) {
    case LogLevel.ERROR:
    case LogLevel.SECURITY:
      console.error(consoleMessage);
      break;
    case LogLevel.WARN:
      console.warn(consoleMessage);
      break;
    default:
      console.log(consoleMessage);
  }

  // Write to audit log file for compliance
  try {
    const logDir = path.join(process.cwd(), '.toon', 'logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    const logFile = path.join(logDir, `audit-${getDateString()}.log`);
    const logLine = JSON.stringify(logEntry) + '\n';

    fs.appendFileSync(logFile, logLine, 'utf8');
  } catch (error) {
    // Silently fail log writing to not break main operation
    // Log to stderr only
    console.error(`Failed to write audit log: ${error.message}`);
  }
}

/**
 * Format log entry for human-readable console output
 * @param {object} logEntry - Log entry
 * @returns {string} Formatted message
 */
function formatConsoleMessage(logEntry) {
  const emoji = getEmojiForLevel(logEntry.level);
  const statusEmoji = getEmojiForStatus(logEntry.status);

  let message = `${emoji} [${logEntry.level}] ${logEntry.action} ${statusEmoji}`;

  if (logEntry.details && Object.keys(logEntry.details).length > 0) {
    // Only show key details in console
    const keyDetails = getKeyDetails(logEntry.details);
    if (keyDetails) {
      message += ` - ${keyDetails}`;
    }
  }

  return message;
}

/**
 * Get emoji for log level
 */
function getEmojiForLevel(level) {
  const emojis = {
    [LogLevel.INFO]: 'ℹ️',
    [LogLevel.WARN]: '⚠️',
    [LogLevel.ERROR]: '❌',
    [LogLevel.SECURITY]: '🔒',
    [LogLevel.AUDIT]: '📋'
  };
  return emojis[level] || '•';
}

/**
 * Get emoji for status
 */
function getEmojiForStatus(status) {
  const emojis = {
    'success': '✅',
    'failure': '❌',
    'started': '▶️',
    'blocked': '🚫'
  };
  return emojis[status] || '';
}

/**
 * Extract key details for console display
 */
function getKeyDetails(details) {
  if (details.file) return `file: ${details.file}`;
  if (details.error) return `error: ${details.error}`;
  if (details.count !== undefined) return `count: ${details.count}`;
  if (details.tokens) return `tokens: ${details.tokens.original} → ${details.tokens.compressed}`;
  return null;
}

/**
 * Get date string for log file naming
 */
function getDateString() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

// Audit logging functions

/**
 * Log operation start
 */
function logOperationStart(action, details = {}) {
  const entry = createLogEntry(LogLevel.AUDIT, action, 'started', details);
  writeLog(entry);
}

/**
 * Log operation success
 */
function logOperationSuccess(action, details = {}) {
  const entry = createLogEntry(LogLevel.AUDIT, action, 'success', details);
  writeLog(entry);
}

/**
 * Log operation failure
 */
function logOperationFailure(action, error, details = {}) {
  const entry = createLogEntry(LogLevel.ERROR, action, 'failure', {
    ...details,
    error: error.message,
    category: error.category || ErrorCategory.SYSTEM
  });
  writeLog(entry);
}

/**
 * Log security event
 */
function logSecurityEvent(action, blocked, details = {}) {
  const entry = createLogEntry(LogLevel.SECURITY, action, blocked ? 'blocked' : 'allowed', details);
  writeLog(entry);
}

/**
 * Log validation error
 */
function logValidationError(action, details = {}) {
  const entry = createLogEntry(LogLevel.WARN, action, 'failure', {
    ...details,
    category: ErrorCategory.VALIDATION
  });
  writeLog(entry);
}

/**
 * Log info message
 */
function logInfo(action, details = {}) {
  const entry = createLogEntry(LogLevel.INFO, action, 'success', details);
  writeLog(entry);
}

/**
 * Create categorized error
 */
function createError(category, message) {
  const error = new Error(message);
  error.category = category;
  return error;
}

module.exports = {
  LogLevel,
  ErrorCategory,
  logOperationStart,
  logOperationSuccess,
  logOperationFailure,
  logSecurityEvent,
  logValidationError,
  logInfo,
  createError
};
