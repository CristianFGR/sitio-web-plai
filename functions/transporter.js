let cached = null;

/**
 * Memoiza el resultado de `factory()` para reutilizarlo en warm starts.
 * Cloud Functions 2nd Gen reutiliza la misma instancia (y por tanto el
 * mismo estado de módulo) entre invocaciones consecutivas.
 */
function getTransporter(factory) {
  if (!cached) {
    cached = factory();
  }
  return cached;
}

function resetTransporterCache() {
  cached = null;
}

module.exports = { getTransporter, resetTransporterCache };
