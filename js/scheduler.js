// Part 2 of technical assessment for MVP talent
// implementation can be viewed throughout
// {conveyer_machine_directory}/js/
(function () {
  var root = this;
  var ConveyerMachine;

  if (typeof exports !== 'undefined')
    ConveyerMachine = exports;
  else
    ConveyerMachine = root.ConveyerMachine = window.ConveyerMachine || {};

  // Set some base math functions to the global
  // namespace
  min = min = Math.min, max = Math.max, pow = Math.pow, sqrt = Math.sqrt, log = Math.log, floor = Math.floor;

  // Do the same for array methods
  slice = Array.slice, splice = Array.splice, every = Array.every;

  // This will be needed
  // for the simulator and can be
  ConveyerMachine.rand = function(s, e) { return floor(Math.random(s, e) * 100); };

  // base of the scheduler
  ConveyerMachine.scheduler = ConveyerMachine.scheduler || {};

  ConveyerMachine.scheduler.bases = {};

  ConveyerMachine.scheduler.current = 0;
 
  ConveyerMachine.scheduler.started = 0;

  ConveyerMachine.scheduler.amountScheduled = 0;


  // given an array of ConveyerMachine bases
  // this will schedule updates for all
  // of them in a round robin fashion
  // @param bases -> ConveyerMachineBase
  // @param cb -> Callback
  ConveyerMachine.scheduler.start = function(bases, cb)
  {
	ConveyerMachine.scheduler.bases = bases;
  	ConveyerMachine.scheduler.changeStatusAll();

	return setTimeout(function() {
		return setInterval(function() {
			if (typeof ConveyerMachine.scheduler.bases[ConveyerMachine.scheduler.current] !== 'undefined') {
				ConveyerMachine.scheduler.amountScheduled = ConveyerMachine.scheduler.bases.length;
				ConveyerMachine.scheduler.bases[ConveyerMachine.scheduler.current].runOnce();
			
				if (ConveyerMachine.scheduler.current >= ConveyerMachine.scheduler.amountScheduled - 1)
					ConveyerMachine.scheduler.current = 0;
				else
					ConveyerMachine.scheduler.current += 1;

				return cb(ConveyerMachine.scheduler.bases[ConveyerMachine.scheduler.current])
			}
		}, 100);
	}, 1000);
  };

  // change the status of all
  // the scheduler
  ConveyerMachine.scheduler.changeStatusAll = function()
  {
	for (var i in ConveyerMachine.scheduler.bases) {
		ConveyerMachine.scheduler.bases[i].statusMessage = "STARTING";
		ConveyerMachine.scheduler.bases[i].viewer.displayDom(ConveyerMachine.scheduler.bases[i]);
	}
  };
}).call(this);
