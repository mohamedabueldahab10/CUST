if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
    var enternameemail = Resources.ar["enternameemail"]
} else {
    var enternameemail = Resources.en["enternameemail"]
}
// using jQuery
window.MyPeoplePicker = function () {
    this.ready = false;
    this.pickerID = "";
    this.users = [];
    /**
     * Render and initialize the client-side People Picker.
     * @param  {String} peoplePickerElementId The `id` from the <div>
     * @param  {Object} [options]
     *   @param {String} [options.PrincipalAccountType='User,DL,SecGroup,SPGroup']
     *   @param {Number} [options.SearchPrincipalSource=15]
     *   @param {Number} [options.ResolvePrincipalSource=15]
     *   @param {Boolean} [options.AllowMultipleValues=true]
     *   @param {Number} [options.MaximumEntitySuggestions=50]
     *   @param {String} [options.Width='280px']
     * @param {Function} [callback] To do an action after the loading
     */
    this.init = function (peoplePickerElementId, options, callback) {
        // Create a schema to store picker properties, and set the properties.
        var schema = {},
            _this = this;
        _this.pickerID = peoplePickerElementId;
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        callback = callback || function () { };

        // the options
        schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
        schema['SearchPrincipalSource'] = 15;
        schema['ResolvePrincipalSource'] = 15;
        schema['AllowMultipleValues'] = true;
        schema['MaximumEntitySuggestions'] = 50;
        schema['Width'] = '280px';
        schema = jQuery.extend({}, schema, options);

        // Render and initialize the picker. 
        // Pass the ID of the DOM element that contains the picker, an array of initial
        // PickerEntity objects to set the picker value, and a schema that defines
        // picker properties.
        // and do it only when all is ready
        $.each(['sp.core.js', 'sp.runtime.js', 'sp.js', 'autofill.js', 'clientpeoplepicker.js', 'clientforms.js', 'clienttemplates.js'], function (idx, val) {
            if (!_v_dictSod[val]) RegisterSod(val, "\u002f_layouts\u002f15\u002f" + val);
        });
        SP.SOD.loadMultiple(['sp.core.js', 'sp.runtime.js', 'sp.js', 'autofill.js', 'clientpeoplepicker.js', 'clientforms.js', 'clienttemplates.js'], function () {
            SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
            _this.ready = true;
            // monitor this field to do something when the value change
            _this._monitor();
            callback.call(_this);

        });

    };
    // Query the picker for user information.
    /**
     * Return an array of users' info
     * @return {[type]} [description]
     */
    this.getUsers = function () {
        var _this = this;
        if (_this.ready === false) {
            alert("[ERROR] Please init the object first")
            return
        }
        // Get the people picker object from the page.
        var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[_this.pickerID + "_TopSpan"];

        // Get information about all users.
        _this.users = peoplePicker.GetAllUserInfo();
        return _this.users;
        // Get user keys.
        //var keys = peoplePicker.GetAllUserKeys();
    };
    /**
     * Get the user ID for the selected users
     * @param  {Function} callback With a parameter that is an array of IDs
     */
    this.getUsersID = function (callback) {
        var context = new SP.ClientContext.get_current();
        var _this = this;
        if (_this.ready === false) {
            alert("[ERROR] Please init the object first")
            return
        }
        callback = callback || function () { };
        var users = _this.getUsers();

        // for each users we create a deferred object
        if (jQuery.type(users) !== "array") users = [users];
        var fctDeferred = jQuery.map(users, function (u) {
            var deferred = jQuery.Deferred();
            var user = context.get_web().ensureUser(u.Key);
            context.load(user);
            context.executeQueryAsync(
                (function () { deferred.resolve(user.get_id()) }),
                (function (sender, args) { deferred.reject('Query failed. Error: ' + args.get_message()) })
            );
            return deferred;
        });

        $.when.apply(_this, fctDeferred).done(function () {
            callback.apply(_this, arguments);
        }).fail(function (error) {
            alert(error)
        })
    };
    /**
     * This function will monitor the field and if something changed then it will send the event "user:changed"
     */
    this._monitor = function () {
        var _this = this;
        _this.monitorID = _this.pickerID + "_TopSpan_HiddenInput";
        _this.monitorValue = document.getElementById(_this.monitorID).value;
        _this.monitorInterval = setInterval(function () {
            var el = document.getElementById(_this.monitorID);
            if (!el) {
                clearInterval(_this.monitorInterval);
            } else {
                if (_this.monitorValue !== el.value) {
                    $('#' + _this.pickerID).trigger("user:changed");
                    //validation code
                    if ($('#' + _this.pickerID + '[required]').find('span.sp-peoplepicker-userSpan').length > 0) {
                        $('#' + _this.pickerID + '[required]').removeClass('picker-error');
                        $('#' + _this.pickerID + '[required]').addClass('picker-valid');
                    } else {
                        $('#' + _this.pickerID + '[required]').removeClass('picker-valid');
                        $('#' + _this.pickerID + '[required]').addClass('picker-error');
                    }

                    //picker multi picks error msg
                    if ($('#' + _this.pickerID + '[required] span.ms-formvalidation.sp-peoplepicker-errorMsg').length) {
                        $('#' + _this.pickerID + '[required] span.ms-formvalidation.sp-peoplepicker-errorMsg').show();

                        // handle user invalid usin aria-invalid attr
                        if ($('#' + _this.pickerID + '[required]').find('span.sp-peoplepicker-userSpan').length > 0) {
                            $('#' + _this.pickerID + '[required]').find('span.sp-peoplepicker-userSpan').each(function () {
                                if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
                                    if ($(this).attr("aria-invalid") == 'true') {
                                        $('#' + _this.pickerID + '[required] span.ms-formvalidation.sp-peoplepicker-errorMsg > span').text(Resources.ar["invaliduserpicker"]);
                                    } else {
                                        $('#' + _this.pickerID + '[required] span.ms-formvalidation.sp-peoplepicker-errorMsg > span').text(Resources.ar["usermultierror"]);
                                    }
                                } else {
                                    if ($(this).attr("aria-invalid") == 'true') {
                                        $('#' + _this.pickerID + '[required] span.ms-formvalidation.sp-peoplepicker-errorMsg > span').text(Resources.en["invaliduserpicker"]);
                                    } else {
                                        $('#' + _this.pickerID + '[required] span.ms-formvalidation.sp-peoplepicker-errorMsg > span').text(Resources.en["usermultierror"]);
                                    }
                                }
                            })

                        }


                        //old one assign a specific msg to different err
                        // if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
                        //     $('#' + _this.pickerID + '[required] span.ms-formvalidation.sp-peoplepicker-errorMsg > span').text(Resources.ar["usermultierror"]);
                        // } else $('#' + _this.pickerID + '[required] span.ms-formvalidation.sp-peoplepicker-errorMsg > span').text(Resources.en["usermultierror"]);
                    }
                    // error in picker not required
                    if ($('#' + _this.pickerID + ' span.ms-formvalidation.sp-peoplepicker-errorMsg').length) {
                        
                        if ($('#' + _this.pickerID).find(' span.sp-peoplepicker-userSpan').length > 0) {

                            $('#' + _this.pickerID).find(' span.sp-peoplepicker-userSpan').each(function () {
                                if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
                                    if ($(this).attr("aria-invalid") == 'true') {
                                        $('#' + _this.pickerID + ' span.ms-formvalidation.sp-peoplepicker-errorMsg').show();
                                        $('#' + _this.pickerID + ' span.ms-formvalidation.sp-peoplepicker-errorMsg > span').text(Resources.ar["invaliduserpicker"]);
                                    }
                                } else {
                                    if ($(this).attr("aria-invalid") == 'true') {
                                        $('#' + _this.pickerID + ' span.ms-formvalidation.sp-peoplepicker-errorMsg').show();
                                        $('#' + _this.pickerID + ' span.ms-formvalidation.sp-peoplepicker-errorMsg > span').text(Resources.en["invaliduserpicker"]);
                                    }
                                }
                            })
                        }
                    }


                }
                // console.log('2');
                _this.monitorValue = el.value;
            }
            // console.log('3');
        }, 200);
        //people picker
        if (isEdit) {
            $('[type="picker"],[type="multipicker"]').each(function () {
                var val = $(this).attr('data-email');
                $(this).find('.sp-peoplepicker-initialHelpText').text(val);
                $(this).find('.sp-peoplepicker-initialHelpText').fadeIn();
            });
        } else if (isNew) {
            window.setTimeout(function () {
                $('.sp-peoplepicker-initialHelpText').text(enternameemail);
                $('.sp-peoplepicker-initialHelpText').fadeIn();
                // if (listkey == 'projects')
                //     $('#ProjectOwner .sp-peoplepicker-initialHelpText').text(UserN.Title);
                // else if (listkey == 'risks')
                //     $('#MitigationOwner .sp-peoplepicker-initialHelpText').text(UserN.Title);
            }, 777);
        }
    },
        /**
         * It will set some users into the PeoplePicker
         * @param {String|Array} users Must be a key value (e.g. "i:0#.w|europe\aymeric_de_martin")
         */
        this.setUsers = function (users) {
            if (jQuery.type(users) === "array") users = users.join(";");
            var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[this.pickerID + "_TopSpan"];
            var e = document.getElementById(peoplePicker.ResolvedListElementId);
            if (e) {
                e = e.querySelectorAll('span');
                var id = e.length;
                // remove existing values from the peoplePicker
                while (id--) { peoplePicker.DeleteProcessedUser(); }
            }
            peoplePicker.AddUserKeys(users, false);

        }
};