/**
 * This is a default transport rule for testing reasons.
 * It does not substract transport costs and uses 10% for life costs..
 * @name defaultRule
 * @type Rule
 */

function defaultRule() {
    this.absorb = function(element, soak) {
        if (element.cornucopia > 0.3) {
            // Try to absorb as much as possible 
            if ((element.max - element.cornucopia) > soak) {
                
            } else {
                element.cornucopia = element.max;
                return (soak - (element.max - element.cornucopia));
            }
        } else {
            // Only take up to 30%
            if (soak > 0.3) {
                this.cornucopia = this.cornucopia + 0.3;
                return (soak - 0.3);
            } else {
                this.cornucopia = this.cornucopia - soak;
            }
        }
    }
    
    this.live = function(element) {
        return 0.1; // Static
    }
}

module.exports = defaultRule;