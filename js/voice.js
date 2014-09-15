(function ()
{
	'use strict';
	var Voice = tm.Class(
	{
		constructor: function (opts)
		{
			tm.extend(this, opts);

			this.osc = this.context.createOscillator();
			this.envelope = this.context.createGain();

			this.osc.connect(this.envelope);
			this.envelope.connect(tm.Synth.master);

			// this.osc.type = this.osc.TRIANGLE
			this.osc.frequency.setValueAtTime(this.note, 0);


			this.setEnvelope();
			this.osc.start(0);
		},

		stop: function ()
		{
			var now = this.context.currentTime;
			var release = now + (this.release / 10.0);

			this.envelope.gain.cancelScheduledValues(now);
			this.envelope.gain.setValueAtTime(this.envelope.gain.value, now);
			this.envelope.gain.setTargetAtTime(0.0, now, (this.release / 100));

			this.osc.stop(release);
		},

		setEnvelope: function ()
		{
			var now = this.context.currentTime;
			var envAttackEnd = now + (this.attack / 10.0);

			this.envelope.gain.setValueAtTime(0.0, now);
			this.envelope.gain.linearRampToValueAtTime(1.0, envAttackEnd);
			this.envelope.gain.setTargetAtTime((this.sustain / 100.0), envAttackEnd, (this.decay / 100.0) + 0.001);
		}
	});

	tm.Voice = Voice;

})();
