// Part 2 of technical assessment for MVP talent
// implementation can be viewed throughout
// {conveyer_machine_directory}/js/
(function () {
  var root = this;
  var ConveyerMachine;

  if (typeof exports !== 'undefined')
    ConveyerMachine = window.ConveyerMachine || {};
  else
    ConveyerMachine = root.ConveyerMachine = window.ConveyerMachine || {};

  // Set some base math functions to the global
  // namespace
  min = min = Math.min, max = Math.max, pow = Math.pow, sqrt = Math.sqrt, log = Math.log, floor = Math.floor;

  // Do the same for array methods
  slice = Array.slice, splice = Array.splice, every = Array.every;

  ConveyerMachine.simulator = ConveyerMachine.simulator || {}; 

  // This will be needed
  // for the simulator and can be
  // @param s -> start of range
  // @param e -> end of range 
  ConveyerMachine.simulator.rand = function(s, e) { return floor(Math.random(s, e) * 100); };

  ConveyerMachine.simulator.register = function()
  {
	return clone(ConveyerMachine.simulator);
  };

  // Generate a new number to
  // add to the weight a ConveyerMachine.base
  // currently has
  // @param timestamp -> unix timestamp
  // @param currentWeight -> currentWeight
  // @param statusMessage -> currentStatus
  ConveyerMachine.simulator.generate = function(timestamp, currentWeight, statusMessage)
  {
  	return statusMessage == 'RUNNING' ? currentWeight + ConveyerMachine.simulator.rand(100, 200) : currentWeight;
  };

}).call(this);
