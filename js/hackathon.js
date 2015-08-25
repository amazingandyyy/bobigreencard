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
/** @type {Array} */
HackathonController.prototype.timelineData;
/** @returns {Array} */
HackathonController.prototype.greenCardData = function(user) {
    var education = user.education;
    var experience = user.experience;
    var nationality = user.nationality;

    var results = [];
    results.push({  
         "title":"綠卡 - PERM - 蒐集資料給律師",
         "processing_time":"看人，約 1 個月",
         "description":"蒐集之前學歷，經歷資訊，與先前經歷的推薦信。"
    });

    results.push({  
         "title":"綠卡 - PERM - Laber Certification",
         "processing_time":"1 到 3 個月",
         "description":"把預定工作內容丟給勞工局，申請綠卡職缺的 Laber Certification"
    });

    results.push({  
         "title":"綠卡 - PERM - Recruiting",
         "processing_time":"4 到 6 個月",
         "description":"公司公告勞工局核可之職缺資訊，在公開人力市場徵才"
    });

    results.push({  
         "title":"綠卡 - PERM - 送件",
         "processing_time":"6 個月",
         "description":"律師送出 PERM 的申請書"
    });

    results.push({  
         "title":"綠卡 - PERM - 稽核（不一定會發生）",
         "processing_time":"6 到 9 個月",
         "description":"有約 30% 的機率被勞工局稽核到，如果被稽核到，PERM 的時程會延長 6 到 9 個月"
    });

    results.push({
         "title":"綠卡 - I-140",
         "processing_time":"3 到 6 個月",
         "description":"通過後，配偶就可以工作了"
    });

    results.push({  
         "title":"綠卡 - I-485",
         "processing_time":"3 到 6 個月",
         "description":"通過後就有綠卡了"
    });

    return results;
};
/** @returns {Array} */
HackathonController.prototype.visaData = function() {
    var result = [];
    
    switch (this.user.status) {
        case 'F1':
            console.log("F1");
            result.push({
                "title":"簽證 - OPT - 實習",
                "processing_time":"1個月",
                "description":"畢業時申請，可立即工作"
            });
            break;
        case 'OPT':
            console.log("OPT");
            result.push({
                "title":"簽證 - H1b - 工作",
                "processing_time":"4 到 6 個月",
                "description":"每年4年接受申請，10月開始工作"
            });
            break;
    }
    return result;
};
/** @type {Function} */
HackathonController.prototype.submit = function() {
    this.$location.hash('');

    // current visa needed
    // green card kick-off
    this.timelineData = this.visaData(this.user).concat(this.greenCardData(this.user));

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
