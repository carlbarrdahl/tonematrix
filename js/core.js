(function ()
{
	'use strict';
	var Core = tm.Class(
	{

		BPM: 120,
		ROWS: 11,
		COLUMNS: 16,
		NOTESIZE: 50,
		currentScale: 'Pentatonic',
		SCALES: {
			Pentatonic: ['C6', 'A5', 'G5', 'E5', 'D5', 'C5', 'A4', 'G4', 'E4', 'D4', 'C4', 'A3'],
			Minor: ['D5', 'C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4', 'B3', 'A3']
		},

		grid: [],
		noteIndex: 0,

		constructor: function (opts)
		{
			this.setScale(localStorage.getItem('scale') || this.currentScale);
			this.Synth = new tm.Synth(
			{
				bpm: this.BPM,
				rows: this.ROWS
			});

			this.generateGrid();

			this.startLoop();
		},

		startLoop: function() {
			clearInterval(this.loop);
			this.loop = setInterval(this.audioLoop.bind(this), 60 / this.BPM / 2 * 1000);
		},

		setScale: function (scale)
		{
			this.currentScale = scale;
			localStorage.setItem('scale', scale);
		},

		setBpm: function (bpm)
		{
			this.BPM = bpm;
			localStorage.setItem('bpm', bpm);
			this.startLoop();
		},

		toggleNote: function (e)
		{
			var row = e.target.getAttribute('data-row');
			var column = e.target.getAttribute('data-column');
			var note = this.grid[row][column];
			this.grid[row][column] = +!note;

			e.target.classList.toggle('active');

			localStorage.setItem('notes', JSON.stringify(this.grid));
		},

		audioLoop: function ()
		{
			var currentTime = this.Synth.context.currentTime - this.startTime;

			for (var i = 0; i < this.grid.length; i++)
			{
				if (this.grid[i][this.noteIndex])
				{
					this.hitNote(tm.$(i + '' + this.noteIndex));
					this.Synth.playNote(this.SCALES[this.currentScale][i]);
				}
			}

			this.noteIndex++;
			if (this.noteIndex === this.COLUMNS)
			{
				this.noteIndex = 0;
			}
		},

		hitNote: function (note)
		{
			note.classList.add('hit');
			setTimeout(function ()
			{
				note.classList.remove('hit');
			}, 500);
		},

		generateGrid: function ()
		{
			var i = 0,
				j, note;

			var tmpGrid = JSON.parse(localStorage.getItem('notes')) || [];

			for (; i < this.ROWS; i++)
			{
				this.grid[i] = [];
				for (j = 0; j < this.COLUMNS; j++)
				{
					this.grid[i].push(0);

					note = document.createElement('div');
					note.id = i + '' + j;
					note.style.cssText = 'width: ' + (this.NOTESIZE - 1) + 'px; height: ' + (this.NOTESIZE - 1) + 'px; top: ' + this.NOTESIZE * i + 'px; left: ' + this.NOTESIZE * j + 'px';
					note.setAttribute('data-row', i);
					note.setAttribute('data-column', j);
					note.classList.add('note');

					tm.$('tonematrix').appendChild(note);

					if (tmpGrid[i] && tmpGrid[i][j])
					{
						this.grid[i][j] = 1;
						note.classList.add('active');
					}
				}
			}

			tm.$('tonematrix').on('click', this.toggleNote.bind(this), false);
			console.log(this.grid);
		}
	});

	tm.Core = Core;

})();