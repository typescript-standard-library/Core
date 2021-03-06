import { LogEvent } from '../core/LogEvent';
import { FilterDecision } from './FilterDecision';

/**
 * Represents log event filter.
 * @see Transport.filters
 * @since 0.14.0
 * @author Alex Chugaev
 */
export interface Filter {
  /**
   * Checks whether log event matches filter.
   * @param event Log event
   * @return onMatch value if log event matches filter, onMismatch value otherwise
   * @see Filter.onMatch
   * @see Filter.onMismatch
   * @since 0.14.0
   * @author Alex Chugaev
   */
  decide(event: LogEvent): FilterDecision;
}
