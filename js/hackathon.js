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

HackathonController.prototype.greencard = function(user) {
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
}

HackathonController.prototype.visa = function() {
    var result = [];
    
    switch (this.user.status) {
        case 'F1':
            console.log("F1");
            result.push({
                "title":"簽證 - OPT - 實習",
                "processing_time":"1個月",
                "description":"畢業時申請，可立即工作"
            });
        case 'OPT':
            console.log("OPT");
            result.push({
                "title":"簽證 - H1b - 工作",
                "processing_time":"4 到 6 個月",
                "description":"每年4年接受申請，10月開始工作"
            });
    }
    return result;
}

/** @type {Function} */
HackathonController.prototype.submit = function() {
    if (this.isSubmitting) {
        return;
    }

    this.isSubmitting = true;
    console.log(this.user);
    this.isSubmitting = false;

    var timeline = HackathonController.prototype.greencard(this.user);

    var aniArr = ['head1', 'head2', 'head3', 'head4', 'tail1', 'tail2', 'tail3', 'tail4'];
    var css = aniArr[Math.floor(Math.random() * aniArr.length)];
    var cssMirror = aniArr[Math.floor(Math.random() * aniArr.length)];
    // current visa needed

    // green card kick-off

    this.css = css;
    this.cssMirror = cssMirror + '-mirror';
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
