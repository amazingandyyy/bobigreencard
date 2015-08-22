/** @constructor */
GC_I485 = function() {};
/** @type {Date|null} */
GC_I485.prototype.submissionDate = null;

/** @enum {number} */
GC_I140_TYPE = {
    EB1: 1,
    EB2: 2,
    EB3: 3
};

/** @constructor */
GC_I140 = function() {};
/** @type {Date|null} */
GC_I140.prototype.submissionDate = null;
/** @type {GC_I140_TYPE|null} */
GC_I140.prototype.type = null;

/** @constructor */
GC_PERM = function() {};
/** @type {Date|null} */
GC_PERM.prototype.permSubmissionDate = null;
/** @type {Date|null} */
GC_PERM.prototype.laborCertificationDate = null;
/** @type {Date|null} */
GC_PERM.prototype.prevailingWagePeriod = null;
/** @type {boolean} */
GC_PERM.prototype.gatherInfo = false;
/** @type {Date|null} */
GC_PERM.prototype.priorityDate = null;

/** @constructor */
H1B = function() {};
/** @type {Date|null} */
H1B.prototype.startDate = null;
/** @type {boolean} */
H1B.prototype.renewewed = false;

/** @enum {number} */
OPT_TYPE = {
    STEM: 1,
    OTHER: 2
};

/** @constructor */
OPT = function() {};
/** @type {OPT_TYPE} */
OPT.prototype.type = OPT_TYPE.STEM;

/** @type {string} */
UserStatus = {
    F1: 'F1',
    L1: 'L1',
    L2: 'L2',
    OPT: 'OPT',
    H1B: 'H1B',
    E: 'E',
    I: 'I'
};

/** @type {string} */
UserEducation = {
    HIGH_SCHOOL: 'high_school',
    COLLEGE: 'college',
    MASTER: 'master',
    PHD: 'phd'
};

/** @enum {string} */
UserExperience = {
    UNDER_5: 'under_5',
    OVER_5: 'over_5',
    MANAGEMENT: 'management'
};

/** @enum {string} */
UserNationality = {
    TAIWAN: 'taiwan',
    CHINA: 'china',
    INDIA: 'india',
    MEXICO: 'mexico',
    PHILIPPINES: 'philippines',
    OTHERS: 'others'
};

/** @constructor */
User = function() {};
/** @tye {string} */
User.prototype.name = '';
/** @tye {string} */
User.prototype.email = '';
/** @type {UserStatus} */
User.prototype.status = '';
/** @type {UserEducation} */
User.prototype.education = '';
/** @type {UserExperience} */
User.prototype.experience = '';
/** @type {UserNationality} */
User.prototype.nationality = '';
/** @type {OPT} */
User.prototype.opt = null;
/** @type {H1B} */
User.prototype.h1b = null;
/** @type {GC_PERM} */
User.prototype.gcPerm = null;
/** @type {GC_I140} */
User.prototype.gcI140 = null;
/** @type {GC_I485} */
User.prototype.gcI485 = null;



var hackathon = angular.module('hackathon', ['ngSanitize', 'ngAnimate']);

/** @constructor */
HackathonController = function($scope, $q) {};
/** @type {User} */
HackathonController.prototype.user = new User();
/** @type {boolean} */
HackathonController.prototype.isSubmitting = false;
/** @type {string} */
HackathonController.prototype.css = '';
/** @type {string} */
HackathonController.prototype.cssMirror = '';

/** @type {Function} */
HackathonController.prototype.submit = function() {
    if (this.isSubmitting) {
        return;
    }

    this.isSubmitting = true;
    console.log(this.user);
    this.isSubmitting = false;

    var aniArr = ['head1', 'head2', 'head3', 'head4', 'tail1', 'tail2', 'tail3', 'tail4'];
    var css = aniArr[Math.floor(Math.random() * aniArr.length)];
    var cssMirror = aniArr[Math.floor(Math.random() * aniArr.length)];

    this.css = css;
    this.cssMirror = cssMirror;
};

hackathon.controller('hackathonCtrl', ['$scope', '$q', HackathonController]);

//hackathon.directive('hackathonDir', [function() {
//    return {
//        'require': 'A',
//        'link': function(scope, element, attrs, ctrls) {
//
//        }
//    };
//}]);

angular.element(document).ready(function() {
    angular.bootstrap(document, ['hackathon']);
});
