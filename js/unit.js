// Part 2 of technical assessment for MVP talent
// implementation can be viewed throughout
// {conveyer_machine_directory}/js/

CONVEYER_UNIT_TESTING_IS_RUNNING = 0;
CONVEYER_UNIT_TESTING_MESSAGE = "Currently running another unit test.. please wait.";
CONVEYER_UNIT_TESTING_EXPORT = {};
CONVEYER_UNIT_TESTING_SIMULATOR = ConveyerMachine.simulator.register();
CONVEYER_UNIT_TESTING_VIEWER = ConveyerMachine.viewer.register();
CONVEYER_UNIT_TESTING_BASE = ConveyerMachine.base;
CONVEYER_UNIT_TESTING_TEMP = 0; 
CONVEYER_UNIT_TESTING_TEMP_01 = 0;


// reset all variables
// needed to run tests
CONVEYER_UNIT_TESTING_RESET_TEMPS = function()
{
	CONVEYER_UNIT_TESTING_TEMP = 0;
	CONVEYER_UNIT_TESTING_TEMP_01 = 0;
	CONVEYER_UNIT_TESTING_BASE.amountOfRuns = 0;
	CONVEYER_UNIT_TESTING_BASE.elapsedWeightMovedSinceReset = 0;
	CONVEYER_UNIT_TESTING_BASE.elapsedTimeSinceReset = 0;
	CONVEYER_UNIT_TESTING_BASE.currentTime = 0;
	CONVEYER_UNIT_TESTING_BASE.currentWeight = 0;
};


// start the conveyer machine
// reset every five seconds
// and verify if properties have
// changed
CONVEYER_UNIT_TESTING_FUNC_01 = function(response)
{
	if (response.amountOfRuns === 20 && response.currentWeight > 0) 
	{
		CONVEYER_UNIT_TESTING_EXPORT.innerHTML = "Passed";	
		CONVEYER_UNIT_TESTING_IS_RUNNING = 0;
		CONVEYER_UNIT_TESTING_BASE.signalStop = 1;
		CONVEYER_UNIT_TESTING_RESET_TEMPS();
		return;
	}	

	if (response.amountOfRuns === 20)
	{
		CONVEYER_UNIT_TESTING_EXPORT.innerHTML = "Failed";	
		CONVEYER_UNIT_TESTING_IS_RUNNING = 0;
		CONVEYER_UNIT_TESTING_BASE.signalStop = 1;
		CONVEYER_UNIT_TESTING_RESET_TEMPS();
		return;
	}


	if (response.elapsedTimeSinceReset % 5 === 0) 
	{
		CONVEYER_UNIT_TESTING_VIEWER.isReset = 1;	
	}
};

// start conveyer for 10 seconds 
// and verify whether time and weight
// has changed
CONVEYER_UNIT_TESTING_FUNC_02 = function(response)
{
	if (response.elapsedTimeSinceReset === 10) 
	{
		if (response.statusMessage !== response.statusMessageStarting) 
		{
			CONVEYER_UNIT_TESTING_EXPORT.innerHTML = "Passed";
			CONVEYER_UNIT_TESTING_IS_RUNNING = 0;
			CONVEYER_UNIT_TESTING_BASE.signalStop = 1;
			CONVEYER_UNIT_TESTING_RESET_TEMPS();
		} 
		else 
		{
			CONVEYER_UNIT_TESTING_EXPORT.innerHTML = "Failed";
			CONVEYER_UNIT_TESTING_IS_RUNNING = 0;
			CONVEYER_UNIT_TESTING_BASE.signalStop = 1;
			CONVEYER_UNIT_TESTING_RESET_TEMPS();
		}
		
	}
};

// determine state of conveyer every reset
// do this for ten attempts. result should be "STARTING"
// each run
CONVEYER_UNIT_TESTING_FUNC_03 = function(response)
{	
	if (CONVEYER_UNIT_TESTING_TEMP === 5) 
	{
		CONVEYER_UNIT_TESTING_EXPORT.innerHTML = "Passed";
		CONVEYER_UNIT_TESTING_IS_RUNNING = 0;
		CONVEYER_UNIT_TESTING_BASE.signalStop = 1;
		CONVEYER_UNIT_TESTING_RESET_TEMPS();
	}

	if (CONVEYER_UNIT_TESTING_TEMP_01) 
	{
		if (response.statusMessage == response.statusMessageRestarting) 
		{
			CONVEYER_UNIT_TESTING_TEMP ++;
		}

		CONVEYER_UNIT_TESTING_TEMP_01 = 0;
	} 

	if (response.amountOfRuns == 1
	   || !CONVEYER_UNIT_TESTING_TEMP_01) {
		CONVEYER_UNIT_TESTING_VIEWER.isReset = 1;
		CONVEYER_UNIT_TESTING_TEMP_01 = 1;
	}
};

// start conveyer, compute time and reset, compare
// to conveyer time elapsed since reset.
// Difference should be no more than .100 second
CONVEYER_UNIT_TESTING_FUNC_04 = function(response)
{
	if (response.amountOfRuns % 5 === 0)
		return CONVEYER_UNIT_TESTING_VIEWER.isReset = 1;	

	if (CONVEYER_UNIT_TESTING_TEMP === 5) 
	{
		CONVEYER_UNIT_TESTING_EXPORT.innerHTML = "Passed";
		CONVEYER_UNIT_TESTING_IS_RUNNING = 0;
		CONVEYER_UNIT_TESTING_BASE.signalStop = 1;
		CONVEYER_UNIT_TESTING_RESET_TEMPS();
	}

	if (response.elapsedWeightMovedSinceReset < response.currentWeight)
		return CONVEYER_UNIT_TESTING_TEMP ++;
};

// verify conveyer's weight is continious
// a set period of time.
// default is 10 seconds
CONVEYER_UNIT_TESTING_FUNC_05 = function(response)
{
	if (response.amountOfRuns === 1)
		CONVEYER_UNIT_TESTING_TEMP = response.currentWeight;

	if (CONVEYER_UNIT_TESTING_TEMP_01 === 10) 
	{
		CONVEYER_UNIT_TESTING_EXPORT.innerHTML = "Passed";
		CONVEYER_UNIT_TESTING_IS_RUNNING = 0;
		CONVEYER_UNIT_TESTING_BASE.signalStop = 1;
		CONVEYER_UNIT_TESTING_RESET_TEMPS();
	}

	if (response.amountOfRuns !== 1) 
	{
		if (response.currentWeight > CONVEYER_UNIT_TESTING_TEMP) 
		{
			CONVEYER_UNIT_TESTING_TEMP_01 ++;	
		} 
		else 
		{
			CONVEYER_UNIT_TESTING_EXPORT.innerHTML = "Passed";
			CONVEYER_UNIT_TESTING_IS_RUNNING = 0;
			CONVEYER_UNIT_TESTING_BASE.signalStop = 1;
		}

	}

	console.log(response.currentWeight);
}

// verify conveyer machine visits every state.
// running, lifting, simulating, starting, resetting.
CONVEYER_UNIT_TESTING_FUNC_06 = function(response)
{
	if (response.amountOfRuns === 20
	   && typeof CONVEYER_UNIT_TESTING_TEMP === 'number')
	{
		CONVEYER_UNIT_TESTING_EXPORT.innerHTML = "Passed";
		CONVEYER_UNIT_TESTING_IS_RUNNING = 0;
		CONVEYER_UNIT_TESTING_BASE.signalStop = 1;
		CONVEYER_UNIT_TESTING_RESET_TEMPS();
	}

	if (response.amountOfRuns !== 1 && typeof CONVEYER_UNIT_TESTING_TEMP !== 'number')
	{
		CONVEYER_UNIT_TESTING_EXPORT.innerHTML = "Failed";
		CONVEYER_UNIT_TESTING_IS_RUNNING = 0;
		CONVEYER_UNIT_TESTING_BASE.signalStop = 1;
		CONVEYER_UNIT_TESTING_RESET_TEMPS();
	}
	
	CONVEYER_UNIT_TESTING_TEMP = response.currentWeight + Math.random(1000000, 999999999) * 999999999; 
	console.log(CONVEYER_UNIT_TESTING_TEMP);
}

// prevent multiple unit test
// from being ran at once
var conveyer_unit_warning = function()
{
	console.log(CONVEYER_UNIT_TESTING_MESSAGE);
	alert(CONVEYER_UNIT_TESTING_MESSAGE);
};

// start the conveyer machine
// reset every five seconds
// and 
var conveyer_unit_test_01 = function(ex)
{
	if (CONVEYER_UNIT_TESTING_IS_RUNNING == 1) 
		return conveyer_unit_warning();

	console.log('starting unit test');
	ex.innerHTML = 'Running';

	CONVEYER_UNIT_TESTING_IS_RUNNING = 1;
	CONVEYER_UNIT_TESTING_EXPORT = ex;

	return CONVEYER_UNIT_TESTING_BASE.run(CONVEYER_UNIT_TESTING_VIEWER,
					      CONVEYER_UNIT_TESTING_SIMULATOR,
					      CONVEYER_UNIT_TESTING_FUNC_01);
					      

};

// start conveyer for 10 seconds 
// and verify whether time and weight
// has changed
var conveyer_unit_test_02 = function(ex)
{
	if (CONVEYER_UNIT_TESTING_IS_RUNNING == 1) 
		return conveyer_unit_warning();


	console.log('starting unit test 2');
	ex.innerHTML = 'Running';

	CONVEYER_UNIT_TESTING_IS_RUNNING = 1;
	CONVEYER_UNIT_TESTING_EXPORT = ex;

	return CONVEYER_UNIT_TESTING_BASE.run(CONVEYER_UNIT_TESTING_VIEWER,
					      CONVEYER_UNIT_TESTING_SIMULATOR,
					      CONVEYER_UNIT_TESTING_FUNC_02);
};

// determine state of conveyer every reset
// do this for ten attempts. result should be "STARTING"
// each run
var conveyer_unit_test_03 = function(ex)
{
	if (CONVEYER_UNIT_TESTING_IS_RUNNING == 1) 
		return conveyer_unit_warning();

	console.log('starting unit test 3');
	ex.innerHTML = 'Running';


	CONVEYER_UNIT_TESTING_IS_RUNNING = 1;
	CONVEYER_UNIT_TESTING_EXPORT = ex;

	return CONVEYER_UNIT_TESTING_BASE.run(CONVEYER_UNIT_TESTING_VIEWER,
					      CONVEYER_UNIT_TESTING_SIMULATOR,
					      CONVEYER_UNIT_TESTING_FUNC_03);
};

// start conveyer, compute time and reset, compare
// to conveyer time elapsed since reset.
// Difference should be no more than .100 second
var conveyer_unit_test_04 = function(ex)
{
	if (CONVEYER_UNIT_TESTING_IS_RUNNING == 1) 
		return conveyer_unit_warning();

	console.log('starting unit test 4');
	ex.innerHTML = 'Running';

	CONVEYER_UNIT_TESTING_IS_RUNNING = 1;
	CONVEYER_UNIT_TESTING_EXPORT = ex;

	return CONVEYER_UNIT_TESTING_BASE.run(CONVEYER_UNIT_TESTING_VIEWER,
					      CONVEYER_UNIT_TESTING_SIMULATOR,
					      CONVEYER_UNIT_TESTING_FUNC_04);

};

// start conveyer, verify weight is continous over
// a certain period of time and does not stall
var conveyer_unit_test_05 = function(ex)
{
	if (CONVEYER_UNIT_TESTING_IS_RUNNING == 1) 
		return conveyer_unit_warning();

	console.log('starting unit test 5');
	ex.innerHTML = 'Running';

	CONVEYER_UNIT_TESTING_IS_RUNNING = 1;
	CONVEYER_UNIT_TESTING_EXPORT = ex;

	return CONVEYER_UNIT_TESTING_BASE.run(CONVEYER_UNIT_TESTING_VIEWER,
					      CONVEYER_UNIT_TESTING_SIMULATOR,
					      CONVEYER_UNIT_TESTING_FUNC_05);

};

// verify conveyer machine visits every state.
// running, lifting, simulating, starting, resetting.
var conveyer_unit_test_06 = function(ex)
{
	if (CONVEYER_UNIT_TESTING_IS_RUNNING == 1) 
		return conveyer_unit_warning();

	console.log('starting unit test 6');
	ex.innerHTML = 'Running';

	CONVEYER_UNIT_TESTING_IS_RUNNING = 1;
	CONVEYER_UNIT_TESTING_EXPORT = ex;

	return CONVEYER_UNIT_TESTING_BASE.run(CONVEYER_UNIT_TESTING_VIEWER,
					      CONVEYER_UNIT_TESTING_SIMULATOR,
					      CONVEYER_UNIT_TESTING_FUNC_06);
};
