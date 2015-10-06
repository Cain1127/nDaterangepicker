'use strict';

angular.module('app', ['nDaterangepicker'])
//angular.module('app', [])
  .decorator('$log', function($delegate) {
    var timeStampFormat = 'DD.MM.YYYY HH:mm:ss.SSS';

    function overwriteLog() {
      // Save the original $log.log()
      var logFn = $delegate.log;

      $delegate.log = function() {
        var args = [].slice.call(arguments),
          now = moment();

        // Prepend timestamp
        args[0] = now.format(timeStampFormat) + ' - ' + args[0];

        // Call the original with the output prepended with formatted timestamp
        logFn.apply(null, args)
      };
    }

    function overwriteDebug() {
      // Save the original $log.debug()
      var debugFn = $delegate.debug;

      $delegate.debug = function() {
        var args = [].slice.call(arguments),
          now = moment();

        // Prepend timestamp
        args[0] = now.format(timeStampFormat) + ' - ' + args[0];

        // Call the original with the output prepended with formatted timestamp
        debugFn.apply(null, args)
      };
    }

    function overwriteInfo() {
      // Save the original $log.info()
      var infoFn = $delegate.info;

      $delegate.info = function() {
        var args = [].slice.call(arguments),
          now = moment();

        // Prepend timestamp
        args[0] = now.format(timeStampFormat) + ' - ' + args[0];

        // Call the original with the output prepended with formatted timestamp
        infoFn.apply(null, args)
      };
    }

    overwriteLog();
    overwriteDebug();
    overwriteInfo();

    return $delegate;
  });

angular.module('app')
  .value('config', {
    dateFormat: 'DD.MM.YYYY'
  });

angular.module('app')
  .controller('AngularCtrl', function($scope, DateRangePickerLocaleService, DateRangePickerService) {
  //.controller('AngularCtrl', function($scope) {
    //moment.locale('et');
    //moment.tz.setDefault('Europe/Tallinn');

    DateRangePickerLocaleService.setFromLabel('Since');
    DateRangePickerService
      .setFormatMask('^[0-3][0-9].[0-1][0-9].[0-9]{4}$');
      //.setFormatMask('^[0-3][0-9].[0-1][0-9].[0-9]{4}$')
      //.setTimeZone(moment().utcOffset());


    $scope.nDate = {
      identifier: 'nDate',
      name: 'nDate',
      options: {
        identifier: 'nDate',
        format: 'DD.MM.YYYY'
      },
      model: '01.01.2014'
      /*model: {
        startDate: '01.01.2014',
        endDate: '01.01.2014'
      }*/
    };

    $scope.nDateShort = {
      identifier: 'nDateShort',
      name: 'nDateShort',
      options: {
        identifier: 'nDateShort',
        format: 'DD.MM.YYYY',
        locale: {
          toLabel: 'Till'
        }
      },
      /*model: {
       startDate: moment('01.01.2014', angular.uppercase('dd.mm.yyyy')),
       endDate: moment('01.01.2015', angular.uppercase('dd.mm.yyyy'))
       }*/
      model: '01.01.2014'
      /*model: {
        startDate: '01.01.2014',
        endDate: '01.01.2014'
      }*/
      /*model: {
       startDate: null,
       endDate: null
       }*/
    };

    $scope.nDateSingle = {
      identifier: 'nDateSingle',
      name: 'nDateSingle',
      options: {
        identifier: 'nDateSingle',
        format: 'DD.MM.YYYY',
        showDropdowns: true,
        type: 'moment'
      },
      //model: null
      model: '02.01.2015'
      /*model: {
        startDate: null,
        filldate: null
      }*/
    };

    $scope.nDatepicker = {
      identifier: 'nDatepicker',
      model: null,
      options: {}
    };

    $scope.nDateRangepicker = {
      model: {
        startDate: null,
        filldate: null
      },
      options: {
        identifier: 'nDateRangepicker'
      }
    };

    $scope.nDateRangepickerComparison = {
      identifier: 'nDateRangepickerComparison',
      name: 'nDateRangepickerComparison',
      model: '03.03.2015',
      options: {
        format: 'DD.MM.YYYY',
        identifier: 'nDateRangepickerComparison'
      },
      notEarlierThan: (moment().subtract(4, 'month').subtract(1, 'days')),
      notLaterThan: new Date()
    };

    $scope.reset = function(identifier) {
      $scope.$broadcast(identifier + 'Reset');
    };

    /*$scope.$watch('nDate', function(newDateRange, oldDateRange) {
     console.groupCollapsed();
     console.info('Old date range (nDate):');
     console.log(oldDateRange);

     console.info('New date range (nDate):');
     console.log(newDateRange);
     console.groupEnd();
     }, true);*/

    /*$scope.$watch('nDateShort', function(newDateRange, oldDateRange) {
     console.groupCollapsed();
     console.info('Old date range (nDateShort):');
     console.log(oldDateRange);

     console.info('New date range (nDateShort):');
     console.log(newDateRange);
     console.groupEnd();
     }, true);*/

    /*$scope.$watch('nDateSingle', function(newDateRange, oldDateRange) {
      //console.groupCollapsed();
      console.info('Old date range (nDateSingle):');
      console.log(oldDateRange);
      if (moment.isMoment(oldDateRange.model)) {
        console.log('Moment date: ' + oldDateRange.model.format('DD.MM.YYYY'));
      }

      console.info('New date range (nDateSingle):');
      console.log(newDateRange);
      if (moment.isMoment(newDateRange.model)) {
        console.log('Moment date: ' + newDateRange.model.format('DD.MM.YYYY'));
      }

      //console.groupEnd();
      console.log('=====================');
    }, true);*/

    $scope.$watch('nDateRangepickerComparison', function(newDateRange, oldDateRange) {
      //console.groupCollapsed();
      console.info('Old date range (nDateRangepickerComparison):');
      console.log(oldDateRange);
      if (moment.isMoment(oldDateRange.model)) {
        console.log('Moment date: ' + oldDateRange.model.format('DD.MM.YYYY'));
      }

      console.info('New date range (nDateRangepickerComparison):');
      console.log(newDateRange);
      if (moment.isMoment(newDateRange.model)) {
        console.log('Moment date: ' + newDateRange.model.format('DD.MM.YYYY'));
      }

      //console.groupEnd();
      console.log('=====================');
    }, true);
  });

angular.module('app')
  .directive('nDatepicker', function(config) {
    return {
      restrict: 'E',
      scope: {
        identifier: '@',
        name: '@',
        model: '=',
        options: '@'
      },
      templateUrl: 'templates/date-picker.html',
      controller: function($scope) {
        $scope.forwardOptions = angular.extend({}, {
          format: config.dateFormat,
          singleDatePicker: true
        }, $scope.options);

        if ($scope.identifier && $scope.identifier.length) {
          $scope.forwardOptions.identifier = $scope.identifier;
        }

        $scope.resetIdentifier = $scope.forwardOptions.identifier;
        $scope.forwardOptions = angular.toJson($scope.forwardOptions);

        $scope.vm = {
          model: $scope.model
        };
      },
      link: function(scope) {
        scope.reset = function() {
          scope.$broadcast(scope.resetIdentifier + 'Reset');
        };

        scope.$watch('vm', function(newValue) {
          scope.model = newValue.model;
        }, true);
      }
    };
  });

angular.module("app")
  .directive('nDateRangepicker', function(config) {
    return {
      restrict: 'E',
      scope: {
        identifier: '@',
        name: '@',
        model: '=',
        options: '='
      },
      templateUrl: 'templates/date-range-picker.html',
      controller: function($scope) {
        $scope.forwardOptions = angular.extend({}, {
          format: config.dateFormat
        }, $scope.options);

        if ($scope.identifier && $scope.identifier.length) {
          $scope.forwardOptions.identifier = $scope.identifier;
        }
      },
      link: function(scope) {
        scope.reset = function() {
          scope.$broadcast(scope.forwardOptions.identifier + 'Reset');
        };
      }
    };
  });


angular.module('app')
  .controller('jQueryCtrl', function($scope) {
    $scope.jqueryDate = {};

    // Basic Date Range Picker
    $('#basic').daterangepicker(null, function(start, end, label) {
      console.log(start.toISOString(), end.toISOString(), label);
    });

    // Basic Single Date Picker
    $('#basicSingle').daterangepicker({
      singleDatePicker: true,
      showDropdowns: true
    },
    function(start, end, label) {
      console.log(start.toISOString(), end.toISOString(), label);
    });

    // Date Range & Time Picker with 30 Minute Increments
    $('#dateAndTimeRangePicker').daterangepicker({
      timePicker: true,
      timePickerIncrement: 30,
      format: 'MM/DD/YYYY h:mm A'
    }, function(start, end, label) {
      console.log(start.toISOString(), end.toISOString(), label);
    });

    // Options Usage
    var cb = function(start, end, label) {
      console.log(start.toISOString(), end.toISOString(), label);
      $('#optionsContainer span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    };

    var optionSetOne = {
      startDate: moment().subtract(29, 'days'),
      endDate: moment(),
      minDate: '01/01/2012',
      maxDate: '12/31/2014',
      dateLimit: { days: 60 },
      showDropdowns: true,
      showWeekNumbers: true,
      timePicker: false,
      timePickerIncrement: 1,
      timePicker12Hour: true,
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      },
      opens: 'left',
      buttonClasses: ['btn btn-default'],
      applyClass: 'btn-small btn-primary',
      cancelClass: 'btn-small',
      format: 'MM/DD/YYYY',
      separator: ' to ',
      locale: {
        applyLabel: 'Submit',
        cancelLabel: 'Clear',
        fromLabel: 'From',
        toLabel: 'To',
        customRangeLabel: 'Custom',
        daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr','Sa'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        firstDay: 1
      }
    };

    var optionSetTwo = {
      startDate: moment().subtract(7, 'days'),
      endDate: moment(),
      opens: 'left',
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      }
    };

    $('#optionSetOne').click(function(event) {
      $('#optionsContainer').data('daterangepicker').setOptions(optionSetOne, cb);
    });

    $('#optionSetOne').click(function(event) {
      $('#optionsContainer').data('daterangepicker').setOptions(optionSetTwo, cb);
    });

    $('#removeDateRangePicker').click(function(event) {
      $('#optionsContainer').data('daterangepicker').remove();
    });

    $('#optionsContainer span').html(moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
    $('#optionsContainer').daterangepicker(optionSetOne, cb);

    $('#optionsContainer').on('show.daterangepicker', function() { console.log("show event fired"); });
    $('#optionsContainer').on('hide.daterangepicker', function() { console.log("hide event fired"); });
    $('#optionsContainer').on('apply.daterangepicker', function(ev, picker) {
      console.log("apply event fired, start/end dates are "
        + picker.startDate.format('MMMM D, YYYY')
        + " to "
        + picker.endDate.format('MMMM D, YYYY')
      );
    });
    $('#optionsContainer').on('cancel.daterangepicker', function(ev, picker) { console.log("cancel event fired"); });

    // Plays nicely with Bootstrap dropdowns
    $('#optionsContainerCenter span').html(moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
    $('#optionsContainerCenter').daterangepicker({
      opens: 'center'
    });
    // @TODO: WIP
    /*function reopenPicker() {
     $('.daterange-close').trigger('click');
     $('#example1').trigger('focus');
     }

     $(window).resize(function() {
     reopenPicker();
     });*/
  });