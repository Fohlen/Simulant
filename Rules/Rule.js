/**
 * Interface for classes that implement cellular rules.
 * When looping in the cellular automat each @see Attribute assigns a rule
 * which defines it's living and transport habits.
 * @interface Rule
 */

/**
 * Calculate the living habbit of the current attribute for the cell.
 * @function
 * @name Rule.live
 * @param {object} element
 * @return {float} - Returns the attribute's current cornucopia
 */ 

/**
 * Calculate the absorbtion and returns the attribute's cornucopia plus it's spill-over
 * Optionally reduced by transport costs
 * @function
 * @name Rule.absorb
 * @param {object} element
 * @param {float} soak - The amount of attribute given
 * @return {array}
 */
