$(document).ready(function() {
    observe(function() {
        var repo = getRepoPath();

        if (repo) {
            showButton();
        }
    });

    var repo = getRepoPath();
    if (repo) {
        showButton();
    }
});

addDialog();

function observe(cb) {
    var observer = new MutationObserver(function(mutations) {
        cb();
    });

    var target = $('div#app').get(0);

    var config = { childList: true, subtree: true };

    observer.observe(target, config);
}

function showButton() {
    if (!$('#try-in-pwd').length) {
        $('section.secondary-top-bar-section ul').append('<li><a style="border: 0; margin-top: 10px;" id="try-in-pwd" data-toggle="modal" data-target="#try-in-pwd-modal"><img src="https://cdn.rawgit.com/play-with-docker/stacks/cff22438/assets/images/button.png" /></a></li>');
    }
}

function getRepoPath() {
    var parser = $('li.active a').get(0);
    if (!parser) {
        return null;
    }

    var chunks = parser.pathname.split('/');
    var path;
    if (chunks[1] == '_') {
        // This is an official repo
        path = '/' + chunks[2];
    } else if (chunks[1] == 'r' && chunks[2] == 'library') {
        // This is a special case of the common libraries
        path = '/' + chunks[3];
    } else if (chunks[1] == 'r') {
        // This is a repo of an organization
        path = '/' + chunks[2] + '/' + chunks[3];
    } else {
        path = null;
    }

    return path;
}

function addDialog() {
    var container = $('body').append('<div id="pwd-dialog"></div>');
    $('#pwd-dialog').load(chrome.extension.getURL('assets/html/dialog.html'));
}

angular.module('PWD', [])
    .controller('TryController', ['$scope', function($scope) {
        $scope.currentRepo = null;
        $scope.tags = [];

        chrome.storage.sync.get({
            pwdUrl: 'http://play-with-docker.com'
        }, function(opts) {
            $scope.pwdUrl = opts.pwdUrl;
        });

        var pwd = this;

        observe(function() {
            var repo = getRepoPath();
            
            if (repo) {
                $scope.changeRepo(repo);
            }
        });

        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                if(request.type == 'change-opts') {
                    $scope.$apply(function() {
                        $scope.pwdUrl = request.opts.pwdUrl;
                    });
                }
            }
        );

        $scope.changeRepo = function(repo) {
            if (repo != $scope.currentRepo) {
                $scope.currentRepo = repo;
                $.get('https://api.github.com/repos/play-with-docker/stacks/contents' + repo)
                    .done(function(data) {
                        $scope.$apply(function() {
                            $scope.tags = data;
                        });
                    })
                    .fail(function(resp) {
                        if (resp.status == 404) {
                            $scope.$apply(function() {
                                $scope.tags = [];
                            });
                        } else {
                            console.error('Could not retrieve stack tags.');
                        }
                    });
            }
        }
    }]);

