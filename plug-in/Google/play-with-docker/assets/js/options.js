$(document).ready(function() {
    $('.save-options').click(function() {
        save({
            pwdUrl: $('#pwdUrl').val()
        });
    });

    load();
});


function load() {
    chrome.storage.sync.get({
        pwdUrl: 'http://play-with-docker.com'
    }, function(opts) {
        $('#pwdUrl').val(opts.pwdUrl);
    });
}

function save(opts) {
    chrome.storage.sync.set(opts, function() {
        chrome.tabs.query({active: true}, function(tabs) {
            tabs.forEach(function(tab) {
                chrome.tabs.sendMessage(tab.id, {type: 'change-opts', opts: opts}, function(response) {});
            });
        });
    });
}
