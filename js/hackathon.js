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

/** @enum {string} */
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



/** @constructor */
HackathonController = function($rootScope, $scope, $q, $location, $anchorScroll, $timeout) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$q = $q;
    this.$location = $location;
    this.$anchorScroll = $anchorScroll;
    this.$timeout = $timeout;

    this.user = new User();
    this.isSubmitting = false;
    this.hasSubmitted = false;
    this.animated = false;
    this.allData = {};
    this.timelineData = [];

    this.$scope.data = {
        started: false,
        animated: false
    };

    var reset = function() {
        this.isSubmitting = false;
        this.animated = false;

        this.$scope.data.started = false;
        this.$scope.data.animated = false;
    }.bind(this);

    this.$scope.$watch('data.animated', function(newValue, oldValue) {
        if (newValue === oldValue) {
            return;
        }

        if (newValue === true) {
            this.animated = newValue;
            this.$location.hash('timeline');
            this.$anchorScroll();
        }
    }.bind(this));

    this.$rootScope.$on('$locationChangeSuccess', function(angularEvent, newUrl, oldUrl) {
        var hash = this.$location.hash();

        if (hash.length === 0) {
            return;
        }

        if (!this.isSubmitting && !this.hasSubmitted) {
            this.$location.hash('');
        }

        reset();
    }.bind(this));

    this.parseCSV();
};
/** @type {angular.Scope} */
HackathonController.prototype.$rootScope;
/** @type {angular.Scope} */
HackathonController.prototype.$scope;
/** @type {angular.$q} */
HackathonController.prototype.$q;
/** @type {angular.$location} */
HackathonController.prototype.$location;
/** @type {angular.$anchorScroll} */
HackathonController.prototype.$anchorScroll;
/** @type {angular.$timeout} */
HackathonController.prototype.$timeout;
/** @type {User} */
HackathonController.prototype.user;
/** @type {boolean} */
HackathonController.prototype.isSubmitting;
/** @type {boolean} */
HackathonController.prototype.hasSubmitted;
/** @type {boolean} */
HackathonController.prototype.animated;
/** @type {Object.<Array>} */
HackathonController.prototype.allData;
/** @type {Array} */
HackathonController.prototype.timelineData;


HackathonController.prototype.parseCSV = function() {
    var self = this;

    Object.getOwnPropertyNames(UserStatus).forEach(function(statusKey) {
        self.allData[UserStatus[statusKey]] = [];
    });

    var completeHandler = function(resultsObj) {
        console.log('Parsed successfully');
        console.log(resultsObj);

        resultsObj.data.forEach(function(result) {
            self.allData[result.status].push(result);
        });

        Object.getOwnPropertyNames(self.allData).forEach(function(statusArray) {
            self.allData[statusArray].sort(function(element1, element2) {
                return parseInt(element1.index, 10) - parseInt(element2.index, 10);
            });
        });
    };

    var errorHandler = function(errorObj) {
        console.log('Failed to parse!');
        console.log(errorObj);
    };

    var url = '../data/data.csv';
    var config = {
        delimiter: ',',
        newline: '',
        header: true,
        worker: true,
        download: true,
        complete: completeHandler,
        error: errorHandler
    };

    Papa.parse(url, config);
};

/** @returns {Array} */
HackathonController.prototype.processVisaSteps = function(user) {
    var self = this;
    var steps = [];

    console.log(user.status);
    var requiredStatuses = [];

    switch (user.status) {
        case UserStatus.F1:
            requiredStatuses.push(UserStatus.F1);
            requiredStatuses.push(UserStatus.OPT);
            break;
        case UserStatus.OPT:
            requiredStatuses.push(UserStatus.OPT);
            break;
    }

    requiredStatuses.forEach(function(status) {
        self.allData[status].forEach(function(step) {
            steps.push(step);
        });
    });

    return steps;
};

/** @returns {Array} */
HackathonController.prototype.processGreenCardSteps = function(user) {
    var self = this;
    var steps = [];

    console.log(user.status);
    var requiredStatuses = [];

    switch (user.status) {
        default:
            requiredStatuses.push(UserStatus.H1B);
            break;
    }

    requiredStatuses.forEach(function(status) {
        self.allData[status].forEach(function(step) {
            steps.push(step);
        });
    });

    return steps;
};

/** @type {Function} */
HackathonController.prototype.getProcessingTimeText = function(timeline) {
    var minMonths = parseInt(timeline.processingTimeMin, 10);
    var maxMonths = parseInt(timeline.processingTimeMax, 10);

    if (minMonths === maxMonths) {
        return maxMonths + ' 個月';
    } else {
        return minMonths + ' 到 ' + maxMonths + ' 個月';
    }
};

/** @type {Function} */
HackathonController.prototype.submit = function() {
    this.$location.hash('');

    // current visa needed
    // green card kick-off
    this.timelineData = this.processVisaSteps(this.user).concat(this.processGreenCardSteps(this.user));

    this.isSubmitting = true;
    this.hasSubmitted = true;
    this.animated = false;

    this.$scope.data.started = true;
    this.$scope.data.animated = false;
};

/** @returns {Object} */
HackathonAnimateDirective = function($animate) {
    var classeNames = ['head1', 'head2', 'head3', 'head4', 'tail1', 'tail2', 'tail3', 'tail4'];

    function getRandomClassName() {
        return classeNames[Math.floor(Math.random() * classeNames.length)];
    }

    function link(scope, element, attrs) {
        var postfix = attrs.animateClassPostfix;

        scope.$watch('data.started', function(newValue, oldValue) {
            if (newValue === oldValue || newValue === false) {
                return;
            }

            classeNames.forEach(function(className) {
                if (element.hasClass(className + postfix)) {
                    element.removeClass(className + postfix);
                }
            });

            $animate.addClass(element, getRandomClassName() + postfix);
        });

        $animate.on('addClass', element, function(element, phase) {
            if (scope.data.animated) {
                return;
            }

            scope.$apply(function() {
                if (phase === 'close') {
                    scope.data.animated = true;
                }
            });
        });
    }

    return {
        restrict: 'A',
        link: link
    };
};

///** @constructor */
//HackathonAnimation = function($animateCss) {
//    return {
//        enter: function(element, doneFn) {
//        }
//    };
//};


/** @type {Object} */
Hackathon = {};
/** @enum {string} */
Hackathon.Module = {
    HACKATHON_APP: 'hackathonApp',
    NG_SANITIZE: 'ngSanitize',
    NG_ANIMATE: 'ngAnimate'
};
/** @enum {string} */
Hackathon.AngularService = {
    $ROOT_SCOPE: '$rootScope',
    $SCOPE: '$scope',
    $Q: '$q',
    $LOCATION: '$location',
    $ANCHOR_SCROLL: '$anchorScroll',
    $ANIMATE: '$animate',
    $ANIMATE_CSS: '$animateCss',
    $TIMEOUT: '$timeout'
};
/** @enum {string} */
Hackathon.AngularProvider = {
    $LOCATION_PROVIDER: '$locationProvider'
};
/** @enum {string} */
Hackathon.Controller = {
    HACKATHON_CTRL: 'hackathonCtrl'
};
/** @enum {string} */
Hackathon.Directive = {
    HACKATHON_ANIMATE: 'hackathonAnimate'
};
/** @enum {string} */
Hackathon.Animation = {
    HACKATHON_ANIMATION: '.hackathonAnimate'
};


var module = angular.module(Hackathon.Module.HACKATHON_APP, [Hackathon.Module.NG_SANITIZE, Hackathon.Module.NG_ANIMATE]);

//module.config([Hackathon.AngularProvider.$LOCATION_PROVIDER, function($locationProvider) {
//    $locationProvider.html5Mode({
//        enabled: true,
//        requireBase: false
//    });
//}]);

module.controller(Hackathon.Controller.HACKATHON_CTRL, [
    Hackathon.AngularService.$ROOT_SCOPE,
    Hackathon.AngularService.$SCOPE,
    Hackathon.AngularService.$Q,
    Hackathon.AngularService.$LOCATION,
    Hackathon.AngularService.$ANCHOR_SCROLL,
    Hackathon.AngularService.$TIMEOUT,
    HackathonController
]);

module.directive(Hackathon.Directive.HACKATHON_ANIMATE, [
    Hackathon.AngularService.$ANIMATE,
    HackathonAnimateDirective
]);

//module.animation(Hackathon.Animation.HACKATHON_ANIMATION, [
//    Hackathon.AngularService.$ANIMATE_CSS,
//    HackathonAnimation
//]);

angular.element(document).ready(function() {
    angular.bootstrap(document, [Hackathon.Module.HACKATHON_APP]);
});
