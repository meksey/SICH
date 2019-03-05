(function ($) { // Play nice with possible other frameworks using the $ variable
    $(function () { // Execute this code as soon as the DOM is loaded

        // All likedislike items found on the page
        /*var $forms = $('form.likedislike');

        // By default prevent normal non-ajax form submits for all templates
        $forms.submit(function() {
            return false;
        });

        // Each template has the freedom to trigger the form submit in its own way,
        // e.g. by submit buttons, by regular buttons, by clicking a radio input, etc.
        // Each template also has the freedom to grab the vote value from anywhere,
        // e.g. from the clicked button, from the selected radio input, etc.
        // This setup is accomplished by using a custom likedislike_vote event
        // which accepts the vote value as an extra parameter.

        // Turns out all templates can use this setup
        $forms.find(':input').click(function() {
            var $this = $(this);
            // Grab the vote value from the clicked button
            $this.closest('form').trigger('thumsup_vote', [$this.val()]);
        });*/

        // The big likedislike form submission handler triggered by all templates
        $('body').on('click','.vote', function (event, vote) {

            var $form = $(this), // Cache the selection. Also allows for better compression of the file.
                template = 'thumbs_up2'; // The name of the template used by the submitted form

            // Don't allow disabled forms to be submitted.
            // A form gets the "disabled" class if it is closed or the user has already voted.
            //if ($form.hasClass('busy') || $form.hasClass('disabled')) return;

            // Prevent double votes
            //$form.addClass('busy');

            // Spinners
            var spinner = {
                small: '<img class="spinner" alt="···" src="' + url_assets + 'css/images/spinner_small.gif" />',
                large: '<img class="spinner" alt="···" src="' + url_assets + 'css/images/spinner_large.gif" />',
                large_green: '<img class="spinner" alt="···" src="' + url_assets + 'css/images/spinner_large_green.gif" />',
                large_red: '<img class="spinner" alt="···" src="' + url_assets + 'css/images/spinner_large_red.gif" />'
            };

            // Show a busy indicator during the ajax request
            switch (template) {

                case 'buttons':
                    $form.find('.question, :button').remove();
                    $form.find('.result1').after(' ' + spinner.small);
                    break;

                case 'mini_poll':
                    $form.find('.result1, .result2').html(spinner.small);
                    break;

                case 'mini_thumbs':
                    $form.find('.result1').html(spinner.small);
                    break;

                case 'thumbs_up_down':
                    $form.find('.result2').html(spinner.large_red);
                case 'thumbs_up':
                    $form.find('.result1').html(spinner.large_green);
                    break;
                case 'thumbs_up2':
                    break;

                case 'up_down':
                    $form.find('.result1').html(spinner.large);
                    break;
            }

            // Cast the vote!
            $.ajax({
                type: 'POST',
                url: url_assets + 'connectors/connector.php?action=web/like',
                cache: false,
                dataType: 'json', // likedislike will send a json response
                timeout: 15000, // Triggers the error handler after this duration

                // We need to send three required POST fields
                data: {
                    // This value of User Authenticated Context
                    ctx: likedislike_ctx,
                    // These values comes from hidden inputs
                    likedislike_id: $form.data('id'),
                    likedislike_format: '{UP}',
                    likedislike_round: '0',

                    // The actual vote value: 0=down, 1=up.
                    // It is passed as an extra parameter to the thumsup_vote event.
                    likedislike_vote: '+1'
                },

                // Called if the request fails or times out.
                // Parameter textStatus examples: "error", "parseerror", "timeout".
                error: function (XMLHttpRequest, textStatus) {
                    $form.find('.error').text(textStatus);
                },

                // Called if the request succeeds
                success: function (data) {

                    // The vote could not be cast
                    if ('error' in data) {
                        // Also make sure the form has the correct classes applied.
                        switch (data.error.error) {

                            case 'invalid_id':
                                $form.css('visibility', 'hidden'); // Hiding it like this prevents content shift
                                break;

                            case 'closed':
                                $form.addClass('closed disabled');
                                break;

                            case 'already_voted':
                            case 'ip_blocked':
                                $form.addClass('user_voted disabled');
                                break;
                        }

                        // Display a custom error message.
                        alert(data.error.lang_error);

                        // We're done with the "success" callback, jump to the "complete" callback
                        return;
                    }

                    // The user has voted
                    //$form.addClass('user_voted disabled');

                    // Update every result area

                    $('.result1').text(data.item.votes_up);
                    /*for (var i = 0; i < data.item.result.length; i++) {
                        // By instantly fading the result to 0.01 opacity, instead of simply using hide(),
                        // some short possible content shift is prevented.
                        $('.result1').text(data.item.result[i]);
                    }*/

                    // Animate graphs
                    if (template === 'mini_poll') {
                        $form.find('.graph').css({opacity: 0, width: 0}).show()
                            .filter('.up').animate({opacity: 1, width: data.item.votes_pct_up + '%'}).end()
                            .filter('.down').animate({opacity: 1, width: data.item.votes_pct_down + '%'});
                    }
                },

                // Called when the request finishes, after the error or success callback
                complete: function () {
                    // Remove spinners
                    //$form.find('.spinner').remove();

                    // Ajax request is done
                    //$form.removeClass('busy');
                }
            }); // $.ajax()
        }); // $forms.bind('thumsup_vote')
        $('.vote_ico').on('click', function (event, vote) {
            event.preventDefault();
            var $form = $(this);

            $.ajax({
                type: 'POST',
                url: url_assets + 'connectors/connector.php?action=web/like',
                cache: false,
                dataType: 'json',
                timeout: 15000,
                data: {
                    ctx: likedislike_ctx,
                    likedislike_id: $form.data('id'),
                    likedislike_format: '{BALANCE}',
                    likedislike_round: '0',
                    likedislike_vote: $form.data('voteval')
                },

                error: function (XMLHttpRequest, textStatus) {
                    $form.find('.error').text(textStatus);
                },
                success: function (data) {
                    if ('error' in data) {
                        switch (data.error.error) {
                            case 'invalid_id':
                                $form.css('visibility', 'hidden');
                                break;
                            case 'closed':
                                $form.addClass('closed disabled');
                                break;
                            case 'already_voted':
                            case 'ip_blocked':
                                $form.addClass('user_voted disabled');
                                break;
                        }
                        $.jGrowl(data.error.lang_error, {theme: 'tickets-message-error', sticky: true});
                        return;
                    }else{
                        $.jGrowl('Спасибо, ваш голос учтен', {theme: 'tickets-message-error', sticky: true});
                        $('.ico_bull').text(Math.floor(data.item.votes_pct_up)+'%');
                        $('.ico_bear').text(Math.floor(data.item.votes_pct_down)+'%');
                        $('.ico_vote-answer').addClass('accent');
                    }
                },

                complete: function () {
                }
            });
        });

    });
})(jQuery);
