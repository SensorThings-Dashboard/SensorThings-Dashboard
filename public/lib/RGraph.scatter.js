// version: 2017-01-02
    /**
    * o--------------------------------------------------------------------------------o
    * | This file is part of the RGraph package - you can learn more at:               |
    * |                                                                                |
    * |                          http://www.rgraph.net                                 |
    * |                                                                                |
    * | RGraph is licensed under the Open Source MIT license. That means that it's     |
    * | totally free to use!                                                           |
    * o--------------------------------------------------------------------------------o
    */

    RGraph = window.RGraph || {isRGraph: true};




    /**
    * The scatter graph constructor
    * 
    * @param object canvas The cxanvas object
    * @param array  data   The chart data
    */
    RGraph.Scatter = function (conf)
    {
        /**
        * Allow for object config style
        */
        if (   typeof conf === 'object'
            && typeof conf.data === 'object'
            && typeof conf.id === 'string') {

            var parseConfObjectForOptions = true; // Set this so the config is parsed (at the end of the constructor)

            this.data = new Array(conf.data.length);

           // Store the data set(s)
            this.data = RGraph.arrayClone(conf.data);


            // Account for just one dataset being given
            if (typeof conf.data === 'object' && typeof conf.data[0] === 'object' && (typeof conf.data[0][0] === 'number' || typeof conf.data[0][0] === 'string')) {
                var tmp = RGraph.arrayClone(conf.data);
                conf.data = new Array();
                conf.data[0] = RGraph.arrayClone(tmp);
                
                this.data = RGraph.arrayClone(conf.data);
            }

        } else {
        
            var conf      = {id: conf};
                conf.data = arguments[1];


            this.data = [];

            // Handle multiple datasets being given as one argument
            if (arguments[1][0] && arguments[1][0][0] && typeof arguments[1][0][0] == 'object') {
                // Store the data set(s)
                for (var i=0; i<arguments[1].length; ++i) {
                    this.data[i] = RGraph.arrayClone(arguments[1][i]);
                }
    
            // Handle multiple data sets being supplied as seperate arguments
            } else {

                // Store the data set(s)
                for (var i=1; i<arguments.length; ++i) {
                    this.data[i - 1] = RGraph.arrayClone(arguments[i]);
                }
            }
        }

        // If necessary convert X/Y values passed as strings to numbers
        for (var i=0,len=this.data.length; i<len; ++i) { // Datasets
            for (var j=0,len2=this.data[i].length; j<len2; ++j) { // Points

                // Handle the conversion of X values
                if (typeof this.data[i][j] === 'object' && !RGraph.isNull(this.data[i][j]) && typeof this.data[i][j][0] === 'string') {
                    if (this.data[i][j][0].match(/^[.0-9]+$/)) {
                        this.data[i][j][0] = parseFloat(this.data[i][j][0]);
                    } else if (this.data[i][j][0] === '') {
                        this.data[i][j][0] = 0;
                    }
                }

                // Handle the conversion of Y values
                if (typeof this.data[i][j] === 'object' && !RGraph.isNull(this.data[i][j]) && typeof this.data[i][j][1] === 'string') {
                    if (this.data[i][j][1].match(/[.0-9]+/)) {
                        this.data[i][j][1] = parseFloat(this.data[i][j][1]);
                    } else if (this.data[i][j][1] === '') {
                        this.data[i][j][1] = 0;
                    }
                }
            }
        }


        this.id                = conf.id;
        this.canvas            = document.getElementById(this.id);
        this.canvas.__object__ = this;
        this.context           = this.canvas.getContext ? this.canvas.getContext('2d') : null;
        this.max               = 0;
        this.coords            = [];
        this.type              = 'scatter';
        this.isRGraph          = true;
        this.uid               = RGraph.CreateUID();
        this.canvas.uid        = this.canvas.uid ? this.canvas.uid : RGraph.CreateUID();
        this.colorsParsed      = false;
        this.coordsText        = [];
        this.original_colors   = [];
        this.firstDraw         = true; // After the first draw this will be false




        // Handle multiple datasets being given as one argument
        //if (arguments[1][0] && arguments[1][0][0] && typeof(arguments[1][0][0]) == 'object') {
        //    // Store the data set(s)
        //    for (var i=0; i<arguments[1].length; ++i) {
        //        this.data[i] = arguments[1][i];
        //    }

        // Handle multiple data sets being supplied as seperate arguments
        //} else {
            // Store the data set(s)
            //for (var i=1; i<arguments.length; ++i) {
            //    this.data[i - 1] = arguments[i];
            //}
        //}


        // Various config properties
        this.properties = {
            'chart.background.barcolor1':   'rgba(0,0,0,0)',
            'chart.background.barcolor2':   'rgba(0,0,0,0)',
            'chart.background.grid':        true,
            'chart.background.grid.width':  1,
            'chart.background.grid.color':  '#ddd',
            'chart.background.grid.hsize':  20,
            'chart.background.grid.vsize':  20,
            'chart.background.hbars':       null,
            'chart.background.vbars':       null,
            'chart.background.grid.vlines': true,
            'chart.background.grid.hlines': true,
            'chart.background.grid.border': true,
            'chart.background.grid.autofit':true,
            'chart.background.grid.autofit.align': true,
            'chart.background.grid.autofit.numhlines': 5,
            'chart.background.grid.autofit.numvlines': 20,
            'chart.background.image':       null,
            'chart.background.image.stretch': true,
            'chart.background.image.x':     null,
            'chart.background.image.y':     null,
            'chart.background.image.w':     null,
            'chart.background.image.h':     null,
            'chart.background.image.align': null,
            'chart.background.color':       null,
            
            'chart.text.size':              12,
            'chart.text.angle':             0,
            'chart.text.color':             'black',
            'chart.text.font':              'Segoe UI, Arial, Verdana, sans-serif',
            'chart.text.accessible':               true,
            'chart.text.accessible.overflow':      'visible',
            'chart.text.accessible.pointerevents': true,
            
            'chart.tooltips':               [], // Default must be an empty array
            'chart.tooltips.effect':         'fade',
            'chart.tooltips.event':          'onmousemove',
            'chart.tooltips.hotspot':        3,
            'chart.tooltips.css.class':      'RGraph_tooltip',
            'chart.tooltips.highlight':      true,
            'chart.tooltips.coords.page':   false,
            
            'chart.units.pre':              '',
            'chart.units.post':             '',
            'chart.numyticks':              10,
            'chart.tickmarks':              'cross',
            
            'chart.tickmarks.image.halign': 'center',
            'chart.tickmarks.image.valign': 'center',
            'chart.tickmarks.image.offsetx': 0,
            'chart.tickmarks.image.offsety': 0,
            'chart.ticksize':               5,
            'chart.numxticks':              true,
            'chart.xaxis':                  true,
            
            'chart.gutter.left':            25,
            'chart.gutter.right':           25,
            'chart.gutter.top':             25,
            'chart.gutter.bottom':          30,

            'chart.colors.bubble.graduated':true,
            'chart.xmin':                   0,
            'chart.xmax':                   0,
            'chart.ymax':                   null,
            'chart.ymin':                   0,
            'chart.scale.decimals':         0,
            'chart.scale.point':            '.',
            'chart.scale.thousand':         ',',
            'chart.scale.zerostart':        true,
            'chart.title':                  '',
            'chart.title.background':       null,
            'chart.title.hpos':             null,
            'chart.title.vpos':             null,
            'chart.title.bold':             true,
            'chart.title.font':             null,
            'chart.title.xaxis':            '',
            'chart.title.xaxis.bold':       true,
            'chart.title.xaxis.size':       null,
            'chart.title.xaxis.font':       null,
            'chart.title.xaxis.color':      null,
            'chart.title.yaxis':            '',
            'chart.title.yaxis.bold':       true,
            'chart.title.yaxis.size':       null,
            'chart.title.yaxis.font':       null,
            'chart.title.yaxis.color':      null,
            'chart.title.xaxis.pos':        null,
            'chart.title.yaxis.pos':        null,
            'chart.title.yaxis.x':          null,
            'chart.title.yaxis.y':          null,
            'chart.title.xaxis.x':          null,
            'chart.title.xaxis.y':          null,
            'chart.title.x':                null,
            'chart.title.y':                null,
            'chart.title.halign':           null,
            'chart.title.valign':           null,
            'chart.labels':                 [],
            'chart.labels.bold':            false,
            'chart.labels.color':           null,
            'chart.labels.ingraph':         null,
            'chart.labels.above':           false,
            'chart.labels.above.size':      8,
            'chart.labels.above.decimals':  0,
            'chart.labels.offsetx':         0,
            'chart.labels.offsety':         0,
            'chart.ylabels.offsetx':        0,
            'chart.ylabels.offsety':        0,
            'chart.ylabels':                true,
            'chart.ylabels.count':          5,
            'chart.ylabels.invert':         false,
            'chart.ylabels.specific':       null,
            'chart.ylabels.inside':         false,
            'chart.contextmenu':            null,
            'chart.defaultcolor':           'black',
            'chart.xaxispos':               'bottom',
            'chart.yaxispos':               'left',
            'chart.crosshairs':             false,
            'chart.crosshairs.color':       '#333',
            'chart.crosshairs.linewidth':   1,
            'chart.crosshairs.coords':      false,
            'chart.crosshairs.coords.fixed':true,
            'chart.crosshairs.coords.fadeout':false,
            'chart.crosshairs.coords.labels.x': 'X',
            'chart.crosshairs.coords.labels.y': 'Y',
            'chart.crosshairs.hline':       true,
            'chart.crosshairs.vline':       true,
            'chart.annotatable':            false,
            'chart.annotate.color':         'black',
            'chart.line':                   false,
            'chart.line.linewidth':         1,
            'chart.line.colors':            ['green', 'red'],
            'chart.line.shadow.color':      'rgba(0,0,0,0)',
            'chart.line.shadow.blur':       2,
            'chart.line.shadow.offsetx':    3,
            'chart.line.shadow.offsety':    3,
            'chart.line.stepped':           false,
            'chart.line.visible':           true,
            'chart.noaxes':                 false,
            'chart.noyaxis':                false,
            'chart.key':                    null,
            'chart.key.background':         'white',
            'chart.key.position':           'graph',
            'chart.key.halign':             'right',
            'chart.key.shadow':             false,
            'chart.key.shadow.color':       '#666',
            'chart.key.shadow.blur':        3,
            'chart.key.shadow.offsetx':     2,
            'chart.key.shadow.offsety':     2,
            'chart.key.position.gutter.boxed': false,
            'chart.key.position.x':         null,
            'chart.key.position.y':         null,
            
            'chart.key.interactive': false,
            'chart.key.interactive.highlight.chart.fill': 'rgba(255,0,0,0.9)',
            'chart.key.interactive.highlight.label': 'rgba(255,0,0,0.2)',
            
            'chart.key.color.shape':        'square',
            'chart.key.rounded':            true,
            'chart.key.linewidth':          1,
            'chart.key.colors':             null,
            'chart.key.text.color':         'black',
            'chart.axis.color':             'black',
            'chart.zoom.factor':            1.5,
            'chart.zoom.fade.in':           true,
            'chart.zoom.fade.out':          true,
            'chart.zoom.hdir':              'right',
            'chart.zoom.vdir':              'down',
            'chart.zoom.frames':            25,
            'chart.zoom.delay':             16.666,
            'chart.zoom.shadow':            true,
            'chart.zoom.background':        true,
            'chart.zoom.action':            'zoom',
            'chart.boxplot.width':          1,
            'chart.boxplot.capped':         true,
            'chart.resizable':              false,
            'chart.resize.handle.background': null,
            'chart.xmin':                   0,
            'chart.labels.specific.align':  'left',
            'chart.xscale':                 false,
            'chart.xscale.units.pre':       '',
            'chart.xscale.units.post':      '',
            'chart.xscale.numlabels':       10,
            'chart.xscale.formatter':       null,
            'chart.xscale.decimals':        0,
            'chart.xscale.thousand':        ',',
            'chart.xscale.point':           '.',
            'chart.noendxtick':             false,
            'chart.noendytick':             true,
            'chart.events.mousemove':       null,
            'chart.events.click':           null,
            'chart.highlight.stroke':       'rgba(0,0,0,0)',
            'chart.highlight.fill':         'rgba(255,255,255,0.7)',
            'chart.clearto':                'rgba(0,0,0,0)',
            'chart.animation.trace':        false,
            'chart.animation.trace.clip':   1
        }

        /**
        * This allows the data points to be given as dates as well as numbers. Formats supported by RGraph.parseDate() are accepted.
        * 
        * ALSO: unrelated but this loop is also used to convert null values to an
        * empty array
        */
        for (var i=0; i<this.data.length; ++i) {
            for (var j=0; j<this.data[i].length; ++j) {
                
                // Convert null data points to an empty erray
                if ( RGraph.isNull(this.data[i][j]) ) {
                    this.data[i][j] = [];
                }

                // Allow for the X point to be dates
                if (this.data[i][j] && typeof(this.data[i][j][0]) == 'string') {
                    this.data[i][j][0] = RGraph.parseDate(this.data[i][j][0]);
                }
            }
        }


        /**
        * Now make the data_arr array - all the data as one big array
        */
        this.data_arr = [];

        for (var i=0; i<this.data.length; ++i) {
            for (var j=0; j<this.data[i].length; ++j) {
                this.data_arr.push(this.data[i][j]);
            }
        }

        // Create the $ objects so that they can be used
        for (var i=0; i<this.data_arr.length; ++i) {
            this['$' + i] = {}
        }


        // Check for support
        if (!this.canvas) {
            alert('[SCATTER] No canvas support');
            return;
        }


        /**
        * Translate half a pixel for antialiasing purposes - but only if it hasn't beeen
        * done already
        */
        if (!this.canvas.__rgraph_aa_translated__) {
            this.context.translate(0.5,0.5);
            
            this.canvas.__rgraph_aa_translated__ = true;
        }



        // Short variable names
        var RG   = RGraph,
            ca   = this.canvas,
            co   = ca.getContext('2d'),
            prop = this.properties,
            pa2  = RG.path2,
            win  = window,
            doc  = document,
            ma   = Math
        
        
        
        /**
        * "Decorate" the object with the generic effects if the effects library has been included
        */
        if (RG.Effects && typeof RG.Effects.decorate === 'function') {
            RG.Effects.decorate(this);
        }







        /**
        * A simple setter
        * 
        * @param string name  The name of the property to set
        * @param string value The value of the property
        */
        this.set =
        this.Set = function (name)
        {
            var value = typeof arguments[1] === 'undefined' ? null : arguments[1];

            /**
            * the number of arguments is only one and it's an
            * object - parse it for configuration data and return.
            */
            if (arguments.length === 1 && typeof name === 'object') {
                RG.parseObjectStyleConfig(this, name);
                return this;
            }



            /**
            * This should be done first - prepend the propertyy name with "chart." if necessary
            */
            if (name.substr(0,6) != 'chart.') {
                name = 'chart.' + name;
            }




            // Convert uppercase letters to dot+lower case letter
            while(name.match(/([A-Z])/)) {
                name = name.replace(/([A-Z])/, '.' + RegExp.$1.toLowerCase());
            }





    
    
            /**
            * BC for chart.xticks
            */
            if (name == 'chart.xticks') {
                name == 'chart.numxticks';
            }
    
            /**
            * This is here because the key expects a name of "chart.colors"
            */
            if (name == 'chart.line.colors') {
                prop['chart.colors'] = value;
            }
            
            /**
            * Allow compatibility with older property names
            */
            if (name == 'chart.tooltip.hotspot') {
                name = 'chart.tooltips.hotspot';
            }


            /**
            * chart.yaxispos should be left or right
            */
            if (name == 'chart.yaxispos' && value != 'left' && value != 'right') {
                alert("[SCATTER] chart.yaxispos should be left or right. You've set it to: '" + value + "' Changing it to left");
                value = 'left';
            }
            
            /**
            * Check for xaxispos
            */
            if (name == 'chart.xaxispos' ) {
                if (value != 'bottom' && value != 'center') {
                    alert('[SCATTER] (' + this.id + ') chart.xaxispos should be center or bottom. Tried to set it to: ' + value + ' Changing it to center');
                    value = 'center';
                }
            }
            
            /**
            * Compatibility for chart.noxaxisoption
            */
            if (name == 'chart.noxaxis' ) {
                name = 'chart.xaxis';
                value = !value;
            }
            prop[name.toLowerCase()] = value;
    
            return this;
        };




        /**
        * A simple getter
        * 
        * @param string name  The name of the property to set
        */
        this.get =
        this.Get = function (name)
        {
            /**
            * This should be done first - prepend the property name with "chart." if necessary
            */
            if (name.substr(0,6) != 'chart.') {
                name = 'chart.' + name;
            }

            // Convert uppercase letters to dot+lower case letter
            while(name.match(/([A-Z])/)) {
                name = name.replace(/([A-Z])/, '.' + RegExp.$1.toLowerCase());
            }
    
            return prop[name];
        };




        /**
        * The function you call to draw the Scatter chart
        */
        this.draw =
        this.Draw = function ()
        {
            // MUST be the first thing done!
            if (typeof prop['chart.background.image'] === 'string') {
                RG.DrawBackgroundImage(this);
            }
    

            /**
            * Fire the onbeforedraw event
            */
            RG.fireCustomEvent(this, 'onbeforedraw');
    
    
            /**
            * Parse the colors. This allows for simple gradient syntax
            */
            if (!this.colorsParsed) {
                this.parseColors();
                
                // Don't want to do this again
                this.colorsParsed = true;
            }
    



            /**
            * Stop this growing uncontrollably
            */
            this.coordsText = [];




            /**
            * This is new in May 2011 and facilitates indiviual gutter settings,
            * eg chart.gutter.left
            */
            this.gutterLeft   = prop['chart.gutter.left'];
            this.gutterRight  = prop['chart.gutter.right'];
            this.gutterTop    = prop['chart.gutter.top'];
            this.gutterBottom = prop['chart.gutter.bottom'];
    
            // Go through all the data points and see if a tooltip has been given
            this.hasTooltips = false;
            var overHotspot  = false;
    
            // Reset the coords array
            this.coords = [];
    
            /**
            * This facilitates the xmax, xmin and X values being dates
            */
            if (typeof(prop['chart.xmin']) == 'string') prop['chart.xmin'] = RG.parseDate(prop['chart.xmin']);
            if (typeof(prop['chart.xmax']) == 'string') prop['chart.xmax'] = RG.parseDate(prop['chart.xmax']);
    
            /**
            * Look for tooltips and populate chart.tooltips
            * 
            * NB 26/01/2011 Updated so that chart.tooltips is ALWAYS populated
            */
            if (!RGraph.ISOLD) {
                this.Set('chart.tooltips', []);
                for (var i=0,len=this.data.length; i<len; i+=1) {
                    for (var j =0,len2=this.data[i].length;j<len2; j+=1) {
    
                        if (this.data[i][j] && this.data[i][j][3]) {
                            prop['chart.tooltips'].push(this.data[i][j][3]);
                            this.hasTooltips = true;
                        } else {
                            prop['chart.tooltips'].push(null);
                        }
                    }
                }
            }
    
            // Reset the maximum value
            this.max = 0;
    
            // Work out the maximum Y value
            //if (prop['chart.ymax'] && prop['chart.ymax'] > 0) {
            if (typeof prop['chart.ymax'] === 'number') {

                this.max   = prop['chart.ymax'];
                this.min   = prop['chart.ymin'] ? prop['chart.ymin'] : 0;


                this.scale2 = RG.getScale2(this, {
                    'max':this.max,
                    'min':this.min,
                    'strict':true,
                    'scale.thousand':prop['chart.scale.thousand'],
                    'scale.point':prop['chart.scale.point'],
                    'scale.decimals':prop['chart.scale.decimals'],
                    'ylabels.count':prop['chart.ylabels.count'],
                    'scale.round':prop['chart.scale.round'],
                    'units.pre': prop['chart.units.pre'],
                    'units.post': prop['chart.units.post']
                });
                
                this.max = this.scale2.max;
                this.min = this.scale2.min;
                var decimals = prop['chart.scale.decimals'];
    
            } else {
    
                var i = 0;
                var j = 0;

                for (i=0,len=this.data.length; i<len; i+=1) {
                    for (j=0,len2=this.data[i].length; j<len2; j+=1) {
                        if (!RG.isNull(this.data[i][j]) && this.data[i][j][1] != null) {
                            this.max = Math.max(this.max, typeof(this.data[i][j][1]) == 'object' ? RG.array_max(this.data[i][j][1]) : Math.abs(this.data[i][j][1]));
                        }
                    }
                }
    
                this.min   = prop['chart.ymin'] ? prop['chart.ymin'] : 0;

                this.scale2 = RG.getScale2(this, {
                    'max':this.max,
                    'min':this.min,
                    'scale.thousand':prop['chart.scale.thousand'],
                    'scale.point':prop['chart.scale.point'],
                    'scale.decimals':prop['chart.scale.decimals'],
                    'ylabels.count':prop['chart.ylabels.count'],
                    'scale.round':prop['chart.scale.round'],
                    'units.pre': prop['chart.units.pre'],
                    'units.post': prop['chart.units.post']
                });

                this.max = this.scale2.max;
                this.min = this.scale2.min;
            }
    
            this.grapharea = ca.height - this.gutterTop - this.gutterBottom;
    
    

            // Progressively Draw the chart
            RG.background.Draw(this);
    
            /**
            * Draw any horizontal bars that have been specified
            */
            if (prop['chart.background.hbars'] && prop['chart.background.hbars'].length) {
                RG.DrawBars(this);
            }
    
            /**
            * Draw any vertical bars that have been specified
            */
            if (prop['chart.background.vbars'] && prop['chart.background.vbars'].length) {
                this.DrawVBars();
            }
    
            if (!prop['chart.noaxes']) {
                this.DrawAxes();
            }
    
            this.DrawLabels();

            // Clip the canvas so that the trace2 effect is facilitated
            if (prop['chart.animation.trace']) {
                co.save();
                co.beginPath();
                co.rect(0, 0, ca.width * prop['chart.animation.trace.clip'], ca.height);
                co.clip();
            }

                for(i=0; i<this.data.length; ++i) {
                    this.DrawMarks(i);
        
                    // Set the shadow
                    co.shadowColor   = prop['chart.line.shadow.color'];
                    co.shadowOffsetX = prop['chart.line.shadow.offsetx'];
                    co.shadowOffsetY = prop['chart.line.shadow.offsety'];
                    co.shadowBlur    = prop['chart.line.shadow.blur'];
    
                    this.DrawLine(i);
        
                    // Turn the shadow off
                    RG.NoShadow(this);
                }
        
        
                if (prop['chart.line']) {
                    for (var i=0,len=this.data.length;i<len; i+=1) {
                        this.DrawMarks(i); // Call this again so the tickmarks appear over the line
                    }
                }
            
            if (prop['chart.animation.trace']) {
                co.restore();
            }
    
    
    
            /**
            * Setup the context menu if required
            */
            if (prop['chart.contextmenu']) {
                RG.ShowContext(this);
            }
    
            
            
            /**
            * Draw the key if necessary
            */
            if (prop['chart.key'] && prop['chart.key'].length) {
                RG.DrawKey(this, prop['chart.key'], prop['chart.line.colors']);
            }
    
    
            /**
            * Draw " above" labels if enabled
            */
            if (prop['chart.labels.above']) {
                this.DrawAboveLabels();
            }
    
            /**
            * Draw the "in graph" labels, using the member function, NOT the shared function in RGraph.common.core.js
            */
            this.DrawInGraphLabels(this);
    
            
            /**
            * This function enables resizing
            */
            if (prop['chart.resizable']) {
                RG.AllowResizing(this);
            }
    
    
            /**
            * This installs the event listeners
            */
            RG.InstallEventListeners(this);


            /**
            * Fire the onfirstdraw event
            */
            if (this.firstDraw) {
                RG.fireCustomEvent(this, 'onfirstdraw');
                this.firstDraw = false;
                this.firstDrawFunc();
            }



            /**
            * Fire the RGraph ondraw event
            */
            RG.FireCustomEvent(this, 'ondraw');


            return this;
        }




        /**
        * Draws the axes of the scatter graph
        */
        this.drawAxes =
        this.DrawAxes = function ()
        {
            var graphHeight = ca.height - this.gutterTop - this.gutterBottom;

            co.beginPath();
            co.strokeStyle = prop['chart.axis.color'];
            co.lineWidth   = (prop['chart.axis.linewidth'] || 1) + 0.001; // Strange Chrome bug

            // Draw the Y axis
            if (prop['chart.noyaxis'] == false) {
                if (prop['chart.yaxispos'] == 'left') {
                    co.moveTo(this.gutterLeft, this.gutterTop);
                    co.lineTo(this.gutterLeft, ca.height - this.gutterBottom);
                } else {
                    co.moveTo(ca.width - this.gutterRight, this.gutterTop);
                    co.lineTo(ca.width - this.gutterRight, ca.height - this.gutterBottom);
                }
            }
    
    
            // Draw the X axis
            if (prop['chart.xaxis']) {
                if (prop['chart.xaxispos'] == 'center') {
                    co.moveTo(this.gutterLeft, ma.round(this.gutterTop + ((ca.height - this.gutterTop - this.gutterBottom) / 2)));
                    co.lineTo(ca.width - this.gutterRight, ma.round(this.gutterTop + ((ca.height - this.gutterTop - this.gutterBottom) / 2)));
                } else {
                    
                    var y = this.getYCoord(this.scale2.min > 0 ? this.scale2.min : 0);

                    co.moveTo(this.gutterLeft, y);
                    co.lineTo(ca.width - this.gutterRight, y);
                }
            }
    
            // Draw the Y tickmarks
            if (prop['chart.noyaxis'] === false) {

                var numyticks = prop['chart.numyticks'];
        
                //for (y=this.gutterTop; y < ca.height - this.gutterBottom + (prop['chart.xaxispos'] == 'center' ? 1 : 0) ; y+=(graphHeight / numyticks)) {
                for (i=0; i<numyticks; ++i) {
        
                    var y = ((ca.height - this.gutterTop - this.gutterBottom) / numyticks) * i;
                        y = y + this.gutterTop;
                    
                    if (prop['chart.xaxispos'] == 'center' && i == (numyticks / 2)) {
                        continue;
                    }
        
                    if (prop['chart.yaxispos'] == 'left') {
                        co.moveTo(this.gutterLeft, ma.round(y));
                        co.lineTo(this.gutterLeft - 3, ma.round(y));
                    } else {
                        co.moveTo(ca.width - this.gutterRight +3, Math.round(y));
                        co.lineTo(ca.width - this.gutterRight, Math.round(y));
                    }
                }
                
                /**
                * Draw the end Y tickmark if the X axis is in the centre
                */
                if (prop['chart.numyticks'] > 0) {
                    if (prop['chart.xaxispos'] == 'center' && prop['chart.yaxispos'] == 'left') {
                        co.moveTo(this.gutterLeft, ma.round(ca.height - this.gutterBottom));
                        co.lineTo(this.gutterLeft - 3, ma.round(ca.height - this.gutterBottom));
                    } else if (prop['chart.xaxispos'] == 'center') {
                        co.moveTo(ca.width - this.gutterRight + 3, ma.round(ca.height - this.gutterBottom));
                        co.lineTo(ca.width - this.gutterRight, ma.round(ca.height - this.gutterBottom));
                    }
                }
    
                /**
                * Draw an extra tick if the X axis isn't being shown
                */
                if (prop['chart.xaxis'] === false && prop['chart.yaxispos'] === 'left') {
                    co.moveTo(this.gutterLeft, ma.round(ca.height - this.gutterBottom));
                    co.lineTo(this.gutterLeft - 3, ma.round(ca.height - this.gutterBottom));
                } else if (prop['chart.xaxis'] === false && prop['chart.yaxispos'] === 'right') {
                    co.moveTo(ca.width - this.gutterRight, ma.round(ca.height - this.gutterBottom));
                    co.lineTo(ca.width - this.gutterRight + 3, ma.round(ca.height - this.gutterBottom));
                }





                //
                // If: the X axis is offset
                //     the Y axis is being shown
                //     there are Y tickmarks
                //
                if (
                       prop['chart.xaxispos'] === 'bottom'
                    && prop['chart.numyticks'] > 0
                   ) {

                    if (prop['chart.yaxispos'] == 'left') {
                        co.moveTo(this.gutterLeft, ma.round(this.getYCoord(prop['chart.ymin'])));
                        co.lineTo(this.gutterLeft - 3, ma.round(this.getYCoord(prop['chart.ymin'])));
                    } else {
                        co.moveTo(ca.width - this.gutterRight +3, ma.round(this.getYCoord(prop['chart.ymin'])));
                        co.lineTo(ca.width - this.gutterRight, ma.round(this.getYCoord(prop['chart.ymin'])));
                    }
                }
            }
    
    
            /**
            * Draw the X tickmarks
            */
            if (prop['chart.numxticks'] > 0 && prop['chart.xaxis']) {

                var x    = 0,
                    y    = this.getYCoord(prop['chart.ylabels.invert'] ? this.scale2.max : 0) - 3,
                    size = 3;
                
                if (prop['chart.ymin'] === 0 && prop['chart.xaxispos'] === 'bottom') {
                    y += 3;
                }

                this.xTickGap = (prop['chart.labels'] && prop['chart.labels'].length) ? ((ca.width - this.gutterLeft - this.gutterRight ) / prop['chart.labels'].length) : (ca.width - this.gutterLeft - this.gutterRight) / 10;
    
                /**
                * This allows the number of X tickmarks to be specified
                */
                if (typeof(prop['chart.numxticks']) == 'number') {
                    this.xTickGap = (ca.width - this.gutterLeft - this.gutterRight) / prop['chart.numxticks'];
                }
    
    
                for (x=(this.gutterLeft + (prop['chart.yaxispos'] == 'left' && prop['chart.noyaxis'] == false ? this.xTickGap : 0) );
                     x <= (ca.width - this.gutterRight - (prop['chart.yaxispos'] == 'left' || prop['chart.noyaxis'] == true ? -1 : 1));
                     x += this.xTickGap) {
    
                    if (prop['chart.yaxispos'] == 'left' && prop['chart.noendxtick'] == true && x == (ca.width - this.gutterRight) ) {
                        continue;
                    } else if (prop['chart.yaxispos'] == 'right' && prop['chart.noendxtick'] == true && x == this.gutterLeft) {
                        continue;
                    }

                    co.moveTo(ma.round(x), y);
                    co.lineTo(ma.round(x), y + (prop['chart.xaxispos'] === 'center' || prop['chart.ymin'] < 0 ? size * 2 : size));
                }
            }
    
            co.stroke();
            
            /**
            * Reset the linewidth back to one
            */
            co.lineWidth = 1;
        };
    
    
    
    
    
    
    
    
    
    
    
        /**
        * Draws the labels on the scatter graph
        */
        this.drawLabels =
        this.DrawLabels = function ()
        {
            co.fillStyle   = prop['chart.text.color'];

            var font       = prop['chart.text.font'],
                xMin       = prop['chart.xmin'],
                xMax       = prop['chart.xmax'],
                yMax       = this.scale2.max,
                yMin       = prop['chart.ymin'] ? prop['chart.ymin'] : 0,
                text_size  = prop['chart.text.size'],
                units_pre  = prop['chart.units.pre'],
                units_post = prop['chart.units.post'],
                numYLabels = prop['chart.ylabels.count'],
                invert     = prop['chart.ylabels.invert'],
                inside     = prop['chart.ylabels.inside'],
                context    = co,
                canvas     = ca,
                boxed      = false,
                offsetx    = prop['chart.ylabels.offsetx'],
                offsety    = prop['chart.ylabels.offsety']

            this.halfTextHeight = text_size / 2;
    
    
            this.halfGraphHeight = (ca.height - this.gutterTop - this.gutterBottom) / 2;
    
            /**
            * Draw the Y yaxis labels, be it at the top or center
            */
            if (prop['chart.ylabels']) {
    
                var xPos  = prop['chart.yaxispos'] == 'left' ? this.gutterLeft - 5 : ca.width - this.gutterRight + 5;
                var align = prop['chart.yaxispos'] == 'right' ? 'left' : 'right';
                
                /**
                * Now change the two things above if chart.ylabels.inside is specified
                */
                if (inside) {
                    if (prop['chart.yaxispos'] == 'left') {
                        xPos  = prop['chart.gutter.left'] + 5;
                        align = 'left';
                        boxed = true;
                    } else {
                        xPos  = ca.width - prop['chart.gutter.right'] - 5;
                        align = 'right';
                        boxed = true;
                    }
                }
    
                if (prop['chart.xaxispos'] == 'center') {
    
    
                    /**
                    * Specific Y labels
                    */
                    if (typeof(prop['chart.ylabels.specific']) == 'object' && prop['chart.ylabels.specific'] != null && prop['chart.ylabels.specific'].length) {
    
                        var labels = prop['chart.ylabels.specific'];
                        
                        if (prop['chart.ymin'] > 0) {
                            labels = [];
                            for (var i=0; i<(prop['chart.ylabels.specific'].length - 1); ++i) {
                                labels.push(prop['chart.ylabels.specific'][i]);
                            }
                        }
    
                        for (var i=0; i<labels.length; ++i) {
                            var y = this.gutterTop + (i * (this.grapharea / (labels.length * 2) ) );
                            RG.Text2(this, {
                                'font':font,
                                'size':text_size,
                                'x':xPos + offsetx,
                                'y':y + offsety,
                                'text':labels[i],
                                'valign':'center',
                                'halign':align,
                                'bounding':boxed,
                                'tag': 'labels.specific'
                            });
                        }
                        
                        var reversed_labels = RG.array_reverse(labels);
                    
                        for (var i=0; i<reversed_labels.length; ++i) {
                            var y = this.gutterTop + (this.grapharea / 2) + ((i+1) * (this.grapharea / (labels.length * 2) ) );
                            RG.Text2(this, {
                                'font':font,
                                'size':text_size,
                                'x':xPos + offsetx,
                                'y':y + offsety,
                                'text':reversed_labels[i],
                                'valign':'center',
                                'halign':align,
                                'bounding':boxed,
                                'tag': 'labels.specific'
                            });
                        }
                        
                        /**
                        * Draw the center label if chart.ymin is specified
                        */
                        if (prop['chart.ymin'] != 0) {
                            RG.Text2(this, {
                                'font':font,
                                'size':text_size,
                                'x':xPos + offsetx,
                                'y':(this.grapharea / 2) + this.gutterTop + offsety,
                                'text':prop['chart.ylabels.specific'][prop['chart.ylabels.specific'].length - 1],
                                'valign':'center',
                                'halign':align,
                                'bounding':boxed,
                                'tag': 'labels.specific'
                            });
                        }
                    }
    
    
                    if (!prop['chart.ylabels.specific'] && typeof numYLabels == 'number') {

                        /**
                        * Draw the top half 
                        */
                        for (var i=0,len=this.scale2.labels.length; i<len; i+=1) {
    
                            //var value = ((this.max - this.min)/ numYLabels) * (i+1);
                            //value  = (invert ? this.max - value : value);
                            //if (!invert) value += this.min;
                            //value = value.toFixed(prop['chart.scale.decimals']);
                        
                            if (!invert) { 
                                RG.Text2(this, {
                                    'font':font,
                                    'size': text_size,
                                    'x': xPos + offsetx,
                                    'y': this.gutterTop + this.halfGraphHeight - (((i + 1)/numYLabels) * this.halfGraphHeight) + offsety,
                                    'valign': 'center',
                                    'halign':align,
                                    'bounding': boxed,
                                    'boundingFill': 'white',
                                    'text': this.scale2.labels[i],
                                    'tag': 'scale'
                                });
                            } else {
                                RG.Text2(this, {
                                    'font':font,
                                    'size': text_size,
                                    'x': xPos + offsetx,
                                    'y': this.gutterTop + this.halfGraphHeight - ((i/numYLabels) * this.halfGraphHeight) + offsety,
                                    'valign': 'center',
                                    'halign':align,
                                    'bounding': boxed,
                                    'boundingFill': 'white',
                                    'text': this.scale2.labels[this.scale2.labels.length - (i + 1)],
                                    'tag': 'scale'
                                });
                            }
                        }
    
                        /**
                        * Draw the bottom half
                        */
                        for (var i=0,len=this.scale2.labels.length; i<len; i+=1) {

                            //var value = (((this.max - this.min)/ numYLabels) * i) + this.min;
                            //    value = (invert ? value : this.max - (value - this.min)).toFixed(prop['chart.scale.decimals']);
    
                            if (!invert) {
                                RG.Text2(this, {
                                    'font':font,
                                    'size': text_size,
                                    'x': xPos + offsetx,
                                    'y': this.gutterTop + this.halfGraphHeight + this.halfGraphHeight - ((i/numYLabels) * this.halfGraphHeight) + offsety,
                                    'valign': 'center',
                                    'halign':align,
                                    'bounding': boxed,
                                    'boundingFill': 'white',
                                    'text': '-' + this.scale2.labels[len - (i+1)],
                                    'tag': 'scale'
                                });
                            } else {
                            
                                // This ensures that the center label isn't drawn twice
                                if (i == (len - 1)&& invert) {
                                    continue;
                                }
    
                                RG.Text2(this, {
                                    'font':font,
                                    'size': text_size,
                                    'x': xPos + offsetx,
                                    'y': this.gutterTop + this.halfGraphHeight + this.halfGraphHeight - (((i + 1)/numYLabels) * this.halfGraphHeight) + offsety,
                                    'valign': 'center',
                                    'halign':align,
                                    'bounding': boxed,
                                    'boundingFill': 'white',
                                    'text': '-' + this.scale2.labels[i],
                                    'tag': 'scale'
                                });
                            }
                        }
    
    
    

                        // If ymin is specified draw that
                        if (!invert && (yMin > 0 || prop['chart.scale.zerostart'])) {

                            RG.text2(this, {
                                font:font,
                                size: text_size,
                                x: xPos + offsetx,
                                y: this.gutterTop + this.halfGraphHeight + offsety,
                                valign: 'center',
                                halign:align,
                                bounding: boxed,
                                boundingFill: 'white',
                                text: RG.numberFormat(this, yMin.toFixed(this.scale2.min === 0 ? 0 : prop['chart.scale.decimals']), units_pre, units_post),
                                tag: 'scale'
                            });
                        }
                        
                        if (invert) {
                            RG.text2(this, {
                                'font':font,
                                'size': text_size,
                                'x': xPos + offsetx,
                                'y': this.gutterTop + offsety,
                                'valign': 'center',
                                'halign':align,
                                'bounding': boxed,
                                'boundingFill': 'white',
                                'text': RG.number_format(this, yMin.toFixed(this.scale2.min === 0 ? 0 : prop['chart.scale.decimals']), units_pre, units_post),
                                'tag': 'scale'
                            });
                            
                            RG.text2(this, {
                                'font':font,
                                'size': text_size,
                                'x': xPos + offsetx,
                                'y': this.gutterTop + (this.halfGraphHeight * 2) + offsety,
                                'valign': 'center',
                                'halign':align,
                                'bounding': boxed,
                                'boundingFill': 'white',
                                'text': '-' + RG.numberFormat(this, yMin.toFixed(this.scale2.min === 0 ? 0 : prop['chart.scale.decimals']), units_pre, units_post),
                                'tag': 'scale'
                            });
                        }
                    }
        
                // X axis at the bottom
                } else {
                    
                    var xPos  = prop['chart.yaxispos'] == 'left' ? this.gutterLeft - 5 : ca.width - this.gutterRight + 5;
                    var align = prop['chart.yaxispos'] == 'right' ? 'left' : 'right';
    
                    if (inside) {
                        if (prop['chart.yaxispos'] == 'left') {
                            xPos  = prop['chart.gutter.left'] + 5;
                            align = 'left';
                            boxed = true;
                        } else {
                            xPos  = ca.width - this.gutterRight - 5;
                            align = 'right';
                            boxed = true;
                        }
                    }
    
                    /**
                    * Specific Y labels
                    */
                    if (typeof prop['chart.ylabels.specific'] == 'object' && prop['chart.ylabels.specific']) {
    
                        var labels = prop['chart.ylabels.specific'];
                        
                        // Lose the last label
                        if (prop['chart.ymin'] > 9999) {
                            labels = [];
                            for (var i=0; i<(prop['chart.ylabels.specific'].length - 1); ++i) {
                                labels.push(prop['chart.ylabels.specific'][i]);
                            }
                        }
    
                        for (var i=0,len=labels.length; i<len; i+=1) {
                            
                            var y = this.gutterTop + (i * (this.grapharea / (len - 1)) );
    
                            RG.Text2(this, {
                                'font':font,
                                'size':text_size,
                                'x':xPos + offsetx,
                                'y':y + offsety,
                                'text':labels[i],
                                'halign':align,
                                'valign':'center',
                                'bounding':boxed,
                                'tag': 'scale'
                            });
                        }
                    
                    /**
                    * X axis at the bottom with a scale
                    */
                    } else {

                        if (typeof(numYLabels) == 'number') {

                            if (invert) {
    
                                for (var i=0; i<numYLabels; ++i) {
    
                                    //var value = ((this.max - this.min)/ numYLabels) * i;
                                    //    value = value.toFixed(prop['chart.scale.decimals']);
                                    var interval = (ca.height - this.gutterTop - this.gutterBottom) / numYLabels;
                                
                                    RG.Text2(this, {
                                        'font':font,
                                        'size': text_size,
                                        'x': xPos + offsetx,
                                        'y': this.gutterTop + ((i+1) * interval) + offsety,
                                        'valign': 'center',
                                        'halign':align,
                                        'bounding': boxed,
                                        'boundingFill': 'white',
                                        'text': this.scale2.labels[i],
                                        'tag': 'scale'
                                    });
                                }
    
        
                                // No X axis being shown and there's no ymin. If ymin IS set its added further down
                                if (!prop['chart.xaxis'] && !prop['chart.ymin']) {

                                    RG.Text2(this, {
                                        'font':font,
                                        'size': text_size,
                                        'x': xPos + offsetx,
                                        'y': this.gutterTop + offsety,
                                        'valign': 'center',
                                        'halign':align,
                                        'bounding': boxed,
                                        'boundingFill': 'white',
                                        'text': RG.numberFormat(this, (this.min).toFixed(this.scale2.min === 0 ? 0 : prop['chart.scale.decimals']), units_pre, units_post),
                                        'tag': 'scale'
                                    });
                                }
        
                            } else {

                                for (var i=0,len=this.scale2.labels.length; i<len; i+=1) {
                                
                                    //var value = ((this.max - this.min)/ numYLabels) * (i+1);
                                    //    value  = (invert ? this.max - value : value);
                                    //    if (!invert) value += this.min;
                                    //    value = value.toFixed(prop['chart.scale.decimals']);
                                
                                    RG.Text2(this, {
                                        'font':font,
                                        'size': text_size,
                                        'x': xPos + offsetx,
                                        'y': this.gutterTop + this.grapharea - (((i + 1)/this.scale2.labels.length) * this.grapharea) + offsety,
                                        'valign': 'center',
                                        'halign':align,
                                        'bounding': boxed,
                                        'boundingFill': 'white',
                                        'text': this.scale2.labels[i],
                                        'tag': 'scale'
                                    });
                                }
    
                                if (!prop['chart.xaxis'] && prop['chart.ymin'] == 0) {
                                    RG.text2(this, {
                                        font:font,
                                        size: text_size,
                                        x: xPos + offsetx,
                                        y: ca.height - this.gutterBottom + offsety,
                                        valign: 'center',
                                        halign:align,
                                        boundin: boxed,
                                        boundingFill: 'white',
                                        text: RG.numberFormat(this, (0).toFixed(this.scale2.min === 0 ? 0 : prop['chart.scale.decimals']), units_pre, units_post),
                                        tag: 'scale'
                                    });
                                }
                            }
                        }
                        
                        if ( (prop['chart.ymin'] || prop['chart.scale.zerostart']) && !invert) {
                            RG.text2(this, {
                                'font':font,
                                'size': text_size,
                                'x': xPos + offsetx,
                                'y': ca.height - this.gutterBottom + offsety,
                                'valign': 'center',
                                'halign':align,
                                'bounding': boxed,
                                'boundingFill': 'white',
                                'text': RG.numberFormat(this, prop['chart.ymin'].toFixed(this.scale2.min === 0 ? 0 : prop['chart.scale.decimals']), units_pre, units_post),
                                'tag': 'scale'
                            });

                        } else if (invert) {
                            RG.text2(this, {
                                'font':font,
                                'size': text_size,
                                'x': xPos + offsetx,
                                'y': this.gutterTop + offsety,
                                'valign': 'center',
                                'halign':align,
                                'bounding': boxed,
                                'boundingFill': 'white',
                                'text': RG.numberFormat(this, prop['chart.ymin'].toFixed(this.scale2.min === 0 ? 0 : prop['chart.scale.decimals']), units_pre, units_post),
                                'tag': 'scale'
                            });
                        }
                    }
                }
            }
    
    
    

            /**
            * Draw an X scale
            */
            if (prop['chart.xscale']) {

                var numXLabels   = prop['chart.xscale.numlabels'],
                    y            = ca.height - this.gutterBottom + 5 + (text_size / 2),
                    units_pre_x  = prop['chart.xscale.units.pre'],
                    units_post_x = prop['chart.xscale.units.post'],
                    decimals     = prop['chart.xscale.decimals'],
                    point        = prop['chart.xscale.point'],
                    thousand     = prop['chart.xscale.thousand'],
                    color        = prop['chart.labels.color'],
                    bold         = prop['chart.labels.bold'],
                    offsetx      = prop['chart.labels.offsetx'],
                    offsety      = prop['chart.labels.offsety']

    
                if (!prop['chart.xmax']) {
                    
                    var xmax = 0;
                    var xmin = prop['chart.xmin'];
                    
                    for (var ds=0,len=this.data.length; ds<len; ds+=1) {
                        for (var point=0,len2=this.data[ds].length; point<len2; point+=1) {
                            xmax = Math.max(xmax, this.data[ds][point][0]);
                        }
                    }
                } else {
                    xmax = prop['chart.xmax'];
                    xmin = prop['chart.xmin']
                }

                this.xscale2 = RG.getScale2(this, {
                    'max':xmax,
                    'min': xmin,
                    'scale.decimals': decimals,
                    'scale.point': point,
                    'scale.thousand': thousand,
                    'units.pre': units_pre_x,
                    'units.post': units_post_x,
                    'ylabels.count': numXLabels,
                    'strict': true
                });

                this.Set('chart.xmax', this.xscale2.max);
                var interval = (ca.width - this.gutterLeft - this.gutterRight) / this.xscale2.labels.length;
    
                for (var i=0,len=this.xscale2.labels.length; i<len; i+=1) {
                
                    var num  = ( (prop['chart.xmax'] - prop['chart.xmin']) * ((i+1) / numXLabels)) + (xmin || 0),
                        x    = this.gutterLeft + ((i+1) * interval),
                        
                        // Repeated a few lines down
                        text = typeof prop['chart.xscale.formatter'] === 'function' ? String(prop['chart.xscale.formatter'](this, num)) : this.xscale2.labels[i];
    
                    RG.text2(this, {
                        'color': color,
                        'font':font,
                        'size': text_size,
                        'bold': bold,
                        'x': x + offsetx,
                        'y': y + offsety,
                        'valign': 'center',
                        'halign':'center',
                        'text':text,
                        'tag': 'xscale'
                    });
                }

                // If the Y axis is on the right hand side - draw the left most X label
                // ** Always added now **
                
                // Repeated a few lines up
                var text = typeof prop['chart.xscale.formatter'] === 'function' ? String(prop['chart.xscale.formatter'](this, prop['chart.xmin'])) : String(prop['chart.xmin']);

                RG.text2(this, {
                    'color': color,
                    'font':font,
                    'size': text_size,
                    'bold':bold,
                    'x': this.gutterLeft + offsetx,
                    'y': y + offsety,
                    'valign': 'center',
                    'halign':'center',
                    'text': text,
                    'tag': 'xscale'
                });

            /**
            * Draw X labels
            */
            } else {
    
                // Put the text on the X axis
                var graphArea = ca.width - this.gutterLeft - this.gutterRight;
                var xInterval = graphArea / prop['chart.labels'].length;
                var xPos      = this.gutterLeft;
                var yPos      = (ca.height - this.gutterBottom) + 3;
                var labels    = prop['chart.labels'];
                var color     = prop['chart.labels.color'];
                var bold      = prop['chart.labels.bold'];
                var offsetx      = prop['chart.labels.offsetx'];
                var offsety      = prop['chart.labels.offsety'];
    
                /**
                * Text angle
                */
                var angle  = 0;
                var valign = 'top';
                var halign = 'center';
        
                if (prop['chart.text.angle'] > 0) {
                    angle  = -1 * prop['chart.text.angle'];
                    valign = 'center';
                    halign = 'right';
                    yPos += 10;
                }
    
                for (i=0; i<labels.length; ++i) {
    
                    if (typeof(labels[i]) == 'object') {
    
                        if (prop['chart.labels.specific.align'] == 'center') {
                            var rightEdge = 0;
        
                            if (labels[i+1] && labels[i+1][1]) {
                                rightEdge = labels[i+1][1];
                            } else {
                                rightEdge = prop['chart.xmax'];
                            }
    
                            var offset = (this.getXCoord(rightEdge) - this.getXCoord(labels[i][1])) / 2;
    
                        } else {
                            var offset = 5;
                        }
                    
    
                        RG.text2(this, {
                            'color': color,
                            'font':font,
                            'size': prop['chart.text.size'],
                            'bold': bold,
                            'x': this.getXCoord(labels[i][1]) + offset + offsetx,
                            'y': yPos + offsety,
                            'valign': valign,
                            'halign':angle != 0 ? 'right' : (prop['chart.labels.specific.align'] == 'center' ? 'center' : 'left'),
                            'text':String(labels[i][0]),
                            'angle':angle,
                            'marker':false,
                            'tag': 'labels.specific'
                        });
                        
                        /**
                        * Draw the gray indicator line
                        */
                        co.beginPath();
                            co.strokeStyle = '#bbb';
                            co.moveTo(ma.round(this.gutterLeft + (graphArea * ((labels[i][1] - xMin)/ (prop['chart.xmax'] - xMin)))), ca.height - this.gutterBottom);
                            co.lineTo(ma.round(this.gutterLeft + (graphArea * ((labels[i][1] - xMin)/ (prop['chart.xmax'] - xMin)))), ca.height - this.gutterBottom + 20);
                        co.stroke();
                    
                    } else {
    
                        RG.text2(this, {
                            'color': color,
                            'font':font,
                            'size': prop['chart.text.size'],
                            'bold': bold,
                            'x': xPos + (xInterval / 2) + offsetx,
                            'y': yPos + offsety,
                            'valign': valign,
                            'halign':halign,
                            'text':String(labels[i]),
                            'angle':angle,
                            'tag': 'labels'
                        });
                    }
                    
                    // Do this for the next time around
                    xPos += xInterval;
                }
        
                /**
                * Draw the final indicator line
                */
                if (typeof(labels[0]) == 'object') {
                    co.beginPath();
                        co.strokeStyle = '#bbb';
                        co.moveTo(this.gutterLeft + graphArea, ca.height - this.gutterBottom);
                        co.lineTo(this.gutterLeft + graphArea, ca.height - this.gutterBottom + 20);
                    co.stroke();
                }
            }
        };
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        /**
        * Draws the actual scatter graph marks
        * 
        * @param i integer The dataset index
        */
        this.drawMarks =
        this.DrawMarks = function (i)
        {
            /**
            *  Reset the coords array
            */
            this.coords[i] = [];
    
            /**
            * Plot the values
            */
            var xmax          = prop['chart.xmax'];
            var default_color = prop['chart.defaultcolor'];

            for (var j=0,len=this.data[i].length; j<len; j+=1) {
                /**
                * This is here because tooltips are optional
                */
                var data_points = this.data[i];
                
                // Allow for null points
                if (RG.isNull(data_points[j])) {
                    continue;
                }

                var xCoord = data_points[j][0];
                var yCoord = data_points[j][1];
                var color  = data_points[j][2] ? data_points[j][2] : default_color;
                var tooltip = (data_points[j] && data_points[j][3]) ? data_points[j][3] : null;
    
                
                this.DrawMark(
                    i,
                    xCoord,
                    yCoord,
                    xmax,
                    this.scale2.max,
                    color,
                    tooltip,
                    this.coords[i],
                    data_points,
                    j
                );
            }
        };




        /**
        * Draws a single scatter mark
        */
        this.drawMark =
        this.DrawMark = function (data_set_index, x, y, xMax, yMax, color, tooltip, coords, data, data_index)
        {
            var tickmarks = prop['chart.tickmarks'],
                tickSize  = prop['chart.ticksize'],
                xMin      = prop['chart.xmin'],
                x         = ((x - xMin) / (xMax - xMin)) * (ca.width - this.gutterLeft - this.gutterRight),
                originalX = x,
                originalY = y;

            /**
            * This allows chart.tickmarks to be an array
            */
            if (tickmarks && typeof(tickmarks) == 'object') {
                tickmarks = tickmarks[data_set_index];
            }
    
    
            /**
            * This allows chart.ticksize to be an array
            */
            if (typeof(tickSize) == 'object') {
                var tickSize     = tickSize[data_set_index];
                var halfTickSize = tickSize / 2;
            } else {
                var halfTickSize = tickSize / 2;
            }
    
    
            /**
            * This bit is for boxplots only
            */
            if (   y
                && typeof y === 'object'
                && typeof y[0] === 'number'
                && typeof y[1] === 'number'
                && typeof y[2] === 'number'
                && typeof y[3] === 'number'
                && typeof y[4] === 'number'
               ) {
    
                //var yMin = prop['chart.ymin'] ? prop['chart.ymin'] : 0;
                this.Set('chart.boxplot', true);
                //this.graphheight = ca.height - this.gutterTop - this.gutterBottom;
                
                //if (prop['chart.xaxispos'] == 'center') {
                //    this.graphheight /= 2;
                //}
    
    
                var y0   = this.getYCoord(y[0]),
                    y1   = this.getYCoord(y[1]),
                    y2   = this.getYCoord(y[2]),
                    y3   = this.getYCoord(y[3]),
                    y4   = this.getYCoord(y[4]),
                    col1 = y[5],
                    col2 = y[6],
                    boxWidth = typeof y[7]  == 'number' ? y[7] : prop['chart.boxplot.width'];
    
                //var y = this.graphheight - y2;
    
            } else {
    
                /**
                * The new way of getting the Y coord. This function (should) handle everything
                */
                var yCoord = this.getYCoord(y);
            }
    
            //if (prop['chart.xaxispos'] == 'center'] {
            //    y /= 2;
            //    y += this.halfGraphHeight;
            //    
            //    if (prop['chart.ylabels.invert']) {
            //        p(y)
            //    }
            //}
    
            /**
            * Account for the X axis being at the centre
            */
            // This is so that points are on the graph, and not the gutter - which helps
            x += this.gutterLeft;
            //y = ca.height - this.gutterBottom - y;
    
    
    
    
            co.beginPath();
            
            // Color
            co.strokeStyle = color;
    
    
    
            /**
            * Boxplots
            */
            if (prop['chart.boxplot']) {

                // boxWidth is a scale value, so convert it to a pixel vlue
                boxWidth = (boxWidth / prop['chart.xmax']) * (ca.width - this.gutterLeft - this.gutterRight);
    
                var halfBoxWidth = boxWidth / 2;
    
                if (prop['chart.line.visible']) {
                    co.beginPath();
                        
                        // Set the outline color of the box

                        if (typeof y[8] === 'string') {
                            co.strokeStyle = y[8];
                        }
                        co.strokeRect(x - halfBoxWidth, y1, boxWidth, y3 - y1);
            
                        // Draw the upper coloured box if a value is specified
                        if (col1) {
                            co.fillStyle = col1;
                            co.fillRect(x - halfBoxWidth, y1, boxWidth, y2 - y1);
                        }
            
                        // Draw the lower coloured box if a value is specified
                        if (col2) {
                            co.fillStyle = col2;
                            co.fillRect(x - halfBoxWidth, y2, boxWidth, y3 - y2);
                        }
                    co.stroke();
        
                    // Now draw the whiskers
                    co.beginPath();
                    if (prop['chart.boxplot.capped']) {
                        co.moveTo(x - halfBoxWidth, ma.round(y0));
                        co.lineTo(x + halfBoxWidth, ma.round(y0));
                    }
        
                    co.moveTo(ma.round(x), y0);
                    co.lineTo(ma.round(x ), y1);
        
                    if (prop['chart.boxplot.capped']) {
                        co.moveTo(x - halfBoxWidth, ma.round(y4));
                        co.lineTo(x + halfBoxWidth, ma.round(y4));
                    }
        
                    co.moveTo(ma.round(x), y4);
                    co.lineTo(ma.round(x), y3);

                    co.stroke();
                }
            }
    
    
            /**
            * Draw the tickmark, but not for boxplots
            */
            if (prop['chart.line.visible'] && typeof(y) == 'number' && !y0 && !y1 && !y2 && !y3 && !y4) {
    
                if (tickmarks == 'circle') {
                    co.arc(x, yCoord, halfTickSize, 0, 6.28, 0);
                    co.fillStyle = color;
                    co.fill();
                
                } else if (tickmarks == 'plus') {
    
                    co.moveTo(x, yCoord - halfTickSize);
                    co.lineTo(x, yCoord + halfTickSize);
                    co.moveTo(x - halfTickSize, yCoord);
                    co.lineTo(x + halfTickSize, yCoord);
                    co.stroke();
                
                } else if (tickmarks == 'square') {
                    co.strokeStyle = color;
                    co.fillStyle = color;
                    co.fillRect(
                        x - halfTickSize,
                        yCoord - halfTickSize,
                        tickSize,
                        tickSize
                    );
                    //co.fill();
    
                } else if (tickmarks == 'cross') {
    
                    co.moveTo(x - halfTickSize, yCoord - halfTickSize);
                    co.lineTo(x + halfTickSize, yCoord + halfTickSize);
                    co.moveTo(x + halfTickSize, yCoord - halfTickSize);
                    co.lineTo(x - halfTickSize, yCoord + halfTickSize);
                    
                    co.stroke();
                
                /**
                * Diamond shape tickmarks
                */
                } else if (tickmarks == 'diamond') {
                    co.fillStyle = co.strokeStyle;
    
                    co.moveTo(x, yCoord - halfTickSize);
                    co.lineTo(x + halfTickSize, yCoord);
                    co.lineTo(x, yCoord + halfTickSize);
                    co.lineTo(x - halfTickSize, yCoord);
                    co.lineTo(x, yCoord - halfTickSize);
    
                    co.fill();
                    co.stroke();
    
                /**
                * Custom tickmark style
                */
                } else if (typeof(tickmarks) == 'function') {
    
                    var graphWidth  = ca.width - this.gutterLeft - this.gutterRight,
                        graphheight = ca.height - this.gutterTop - this.gutterBottom,
                        xVal = ((x - this.gutterLeft) / graphWidth) * xMax,
                        yVal = ((graphheight - (yCoord - this.gutterTop)) / graphheight) * yMax;
    
                    tickmarks(this, data, x, yCoord, xVal, yVal, xMax, yMax, color, data_set_index, data_index)

















                /**
                * Image based tickmark
                */
                // lineData, xPos, yPos, color, isShadow, prevX, prevY, tickmarks, index
                } else if (
                           typeof tickmarks === 'string' &&
                            (
                             tickmarks.substr(0, 6) === 'image:'  ||
                             tickmarks.substr(0, 5) === 'data:'   ||
                             tickmarks.substr(0, 1) === '/'       ||
                             tickmarks.substr(0, 3) === '../'     ||
                             tickmarks.substr(0, 7) === 'images/'
                            )
                          ) {
    
                    var img = new Image();
                    
                    if (tickmarks.substr(0, 6) === 'image:') {
                        img.src = tickmarks.substr(6);
                    } else {
                        img.src = tickmarks;
                    }
    

                    img.onload = function ()
                    {
                        if (prop['chart.tickmarks.image.halign'] === 'center') x -= (this.width / 2);
                        if (prop['chart.tickmarks.image.halign'] === 'right')  x -= this.width;

                        if (prop['chart.tickmarks.image.valign'] === 'center') yCoord -= (this.height / 2);
                        if (prop['chart.tickmarks.image.valign'] === 'bottom') yCoord -= this.height;
                        
                        x += prop['chart.tickmarks.image.offsetx'];
                        yCoord += prop['chart.tickmarks.image.offsety'];
    
                        co.drawImage(this, x, yCoord);
                    }





                /**
                * No tickmarks
                */
                } else if (tickmarks === null) {
        
                /**
                * Unknown tickmark type
                */
                } else {
                    alert('[SCATTER] (' + this.id + ') Unknown tickmark style: ' + tickmarks );
                }
            }
    
            /**
            * Add the tickmark to the coords array
            */

            if (   prop['chart.boxplot']
                && typeof y0 === 'number'
                && typeof y1 === 'number'
                && typeof y2 === 'number'
                && typeof y3 === 'number'
                && typeof y4 === 'number') {
    
                x      = [x - halfBoxWidth, x + halfBoxWidth];
                yCoord = [y0, y1, y2, y3, y4];
            }
    
            coords.push([x, yCoord, tooltip]);
        };




        /**
        * Draws an optional line connecting the tick marks.
        * 
        * @param i The index of the dataset to use
        */
        this.drawLine =
        this.DrawLine = function (i)
        {
            if (typeof(prop['chart.line.visible']) == 'boolean' && prop['chart.line.visible'] == false) {
                return;
            }
    
            if (prop['chart.line'] && this.coords[i].length >= 2) {
            
                if (prop['chart.line.dash'] && typeof co.setLineDash === 'function') {
                    co.setLineDash(prop['chart.line.dash']);
                }

                co.lineCap     = 'round';
                co.lineJoin    = 'round';
                co.lineWidth   = this.getLineWidth(i);// i is the index of the set of coordinates
                co.strokeStyle = prop['chart.line.colors'][i];

                co.beginPath();

                    var prevY = null;
                    var currY = null;
        
                    for (var j=0,len=this.coords[i].length; j<len; j+=1) {
                    
        
                        var xPos = this.coords[i][j][0];
                        var yPos = this.coords[i][j][1];
                        
                        if (j > 0) prevY = this.coords[i][j - 1][1];
                        currY = yPos;
    
                        if (j == 0 || RG.is_null(prevY) || RG.is_null(currY)) {
                            co.moveTo(xPos, yPos);
                        } else {
                        
                            // Stepped?
                            var stepped = prop['chart.line.stepped'];
        
                            if (   (typeof stepped == 'boolean' && stepped)
                                || (typeof stepped == 'object' && stepped[i])
                               ) {
                                co.lineTo(this.coords[i][j][0], this.coords[i][j - 1][1]);
                            }
        
                            co.lineTo(xPos, yPos);
                        }
                    }
                co.stroke();
            
                /**
                * Set the linedash back to the default
                */
                if (prop['chart.line.dash'] && typeof co.setLineDash === 'function') {
                    co.setLineDash([1,0]);
                }
            }

            /**
            * Set the linewidth back to 1
            */
            co.lineWidth = 1;
        };




        /**
        * Returns the linewidth
        * 
        * @param number i The index of the "line" (/set of coordinates)
        */
        this.getLineWidth =
        this.GetLineWidth = function (i)
        {
            var linewidth = prop['chart.line.linewidth'];
            
            if (typeof linewidth == 'number') {
                return linewidth;
            
            } else if (typeof linewidth == 'object') {
                if (linewidth[i]) {
                    return linewidth[i];
                } else {
                    return linewidth[0];
                }
    
                alert('[SCATTER] Error! chart.linewidth should be a single number or an array of one or more numbers');
            }
        };




        /**
        * Draws vertical bars. Line chart doesn't use a horizontal scale, hence this function
        * is not common
        */
        this.drawVBars =
        this.DrawVBars = function ()
        {

            var vbars = prop['chart.background.vbars'];
            var graphWidth = ca.width - this.gutterLeft - this.gutterRight;

            if (vbars) {
            
                var xmax       = prop['chart.xmax'];
                var xmin       = prop['chart.xmin'];
                
                for (var i=0,len=vbars.length; i<len; i+=1) {
                    
                    var key = i;
                    var value = vbars[key];

                    /**
                    * Accomodate date/time values
                    */
                    if (typeof value[0] == 'string') value[0] = RG.parseDate(value[0]);
                    if (typeof value[1] == 'string') value[1] = RG.parseDate(value[1]) - value[0];

                    var x     = (( (value[0] - xmin) / (xmax - xmin) ) * graphWidth) + this.gutterLeft;
                    var width = (value[1] / (xmax - xmin) ) * graphWidth;

                    co.fillStyle = value[2];
                    co.fillRect(x, this.gutterTop, width, (ca.height - this.gutterTop - this.gutterBottom));
                }
            }
        };




        /**
        * Draws in-graph labels.
        * 
        * @param object obj The graph object
        */
        this.drawInGraphLabels =
        this.DrawInGraphLabels = function (obj)
        {
            var labels  = obj.Get('chart.labels.ingraph');
            var labels_processed = [];
    
            if (!labels) {
                return;
            }
    
            // Defaults
            var fgcolor   = 'black';
            var bgcolor   = 'white';
            var direction = 1;
    
            /**
            * Preprocess the labels array. Numbers are expanded
            */
            for (var i=0,len=labels.length; i<len; i+=1) {
                if (typeof(labels[i]) == 'number') {
                    for (var j=0; j<labels[i]; ++j) {
                        labels_processed.push(null);
                    }
                } else if (typeof(labels[i]) == 'string' || typeof(labels[i]) == 'object') {
                    labels_processed.push(labels[i]);
                
                } else {
                    labels_processed.push('');
                }
            }
    
            /**
            * Turn off any shadow
            */
            RG.NoShadow(obj);
    
            if (labels_processed && labels_processed.length > 0) {
    
                var i=0;
    
                for (var set=0; set<obj.coords.length; ++set) {
                    for (var point = 0; point<obj.coords[set].length; ++point) {
                        if (labels_processed[i]) {
                            var x = obj.coords[set][point][0];
                            var y = obj.coords[set][point][1];
                            var length = typeof(labels_processed[i][4]) == 'number' ? labels_processed[i][4] : 25;
                                
                            var text_x = x;
                            var text_y = y - 5 - length;
    
                            co.moveTo(x, y - 5);
                            co.lineTo(x, y - 5 - length);
                            
                            co.stroke();
                            co.beginPath();
                            
                            // This draws the arrow
                            co.moveTo(x, y - 5);
                            co.lineTo(x - 3, y - 10);
                            co.lineTo(x + 3, y - 10);
                            co.closePath();
    
    
                            co.beginPath();
                                // Fore ground color
                                co.fillStyle = (typeof(labels_processed[i]) == 'object' && typeof(labels_processed[i][1]) == 'string') ? labels_processed[i][1] : 'black';
                                RG.text2(this, {
                                    'font':obj.Get('chart.text.font'),                            
                                    'size':obj.Get('chart.text.size'),
                                    'x':text_x,
                                    'y':text_y,
                                    'text':(typeof(labels_processed[i]) == 'object' && typeof(labels_processed[i][0]) == 'string') ? labels_processed[i][0] : labels_processed[i],
                                    'valign':'bottom',
                                    'halign':'center',
                                    'bounding':true,
                                    'bounding.fill':(typeof(labels_processed[i]) == 'object' && typeof(labels_processed[i][2]) == 'string') ? labels_processed[i][2] : 'white',
                                    'tag': 'labels.ingraph'
                                });
                            co.fill();
                        }
                        
                        i++;
                    }
                }
            }
        };




        /**
        * This function makes it much easier to get the (if any) point that is currently being hovered over.
        * 
        * @param object e The event object
        */
        this.getShape =
        this.getPoint = function (e)
        {
            var mouseXY     = RG.getMouseXY(e);
            var mouseX      = mouseXY[0];
            var mouseY      = mouseXY[1];
            var overHotspot = false;
            var offset      = prop['chart.tooltips.hotspot']; // This is how far the hotspot extends
    
            for (var set=0,len=this.coords.length; set<len; ++set) {
                for (var i=0,len2=this.coords[set].length; i<len2; ++i) {

                    var x = this.coords[set][i][0];
                    var y = this.coords[set][i][1];
                    var tooltip = this.data[set][i][3];
    
                    if (typeof(y) == 'number') {
                        if (mouseX <= (x + offset) &&
                            mouseX >= (x - offset) &&
                            mouseY <= (y + offset) &&
                            mouseY >= (y - offset)) {
    
                            var tooltip = RG.parseTooltipText(this.data[set][i][3], 0);
                            var index_adjusted = i;
    
                            for (var ds=(set-1); ds >=0; --ds) {
                                index_adjusted += this.data[ds].length;
                            }
    
                            return {
                                    0: this, 1: x, 2: y, 3: set, 4: i, 5: this.data[set][i][3],
                                    'object': this, 'x': x, 'y': y, 'dataset': set, 'index': i, 'tooltip': tooltip, 'index_adjusted': index_adjusted
                                   };
                        }
                    } else if (RG.is_null(y)) {
                        // Nothing to see here
    
                    } else {
    
                        var mark = this.data[set][i];
    
                        /**
                        * Determine the width
                        */
                        var width = prop['chart.boxplot.width'];
                        
                        if (typeof(mark[1][7]) == 'number') {
                            width = mark[1][7];
                        }
    
                        if (   typeof(x) == 'object'
                            && mouseX > x[0]
                            && mouseX < x[1]
                            && mouseY < y[1]
                            && mouseY > y[3]
                            ) {
    
                            var tooltip = RG.parseTooltipText(this.data[set][i][3], 0);
    
                            return {
                                    0: this, 1: x[0], 2: x[1] - x[0], 3: y[1], 4: y[3] - y[1], 5: set, 6: i, 7: this.data[set][i][3],
                                    'object': this, 'x': x[0], 'y': y[1], 'width': x[1] - x[0], 'height': y[3] - y[1], 'dataset': set, 'index': i, 'tooltip': tooltip
                                   };
                        }
                    }
                }
            }
        };




        /**
        * Draws the above line labels
        */
        this.drawAboveLabels =
        this.DrawAboveLabels = function ()
        {
            var size       = prop['chart.labels.above.size'];
            var font       = prop['chart.text.font'];
            var units_pre  = prop['chart.units.pre'];
            var units_post = prop['chart.units.post'];
    
    
            for (var set=0,len=this.coords.length; set<len; ++set) {
                for (var point=0,len2=this.coords[set].length; point<len2; ++point) {
                    
                    var x_val = this.data[set][point][0];
                    var y_val = this.data[set][point][1];
                    
                    if (!RG.is_null(y_val)) {
                        
                        // Use the top most value from a box plot
                        if (RG.is_array(y_val)) {
                            var max = 0;
                            for (var i=0; i<y_val; ++i) {
                                max = Math.max(max, y_val[i]);
                            }
                            
                            y_val = max;
                        }
                        
                        var x_pos = this.coords[set][point][0];
                        var y_pos = this.coords[set][point][1];
    
                        RG.Text2(this, {
                                            'font':font,
                                            'size':size,
                                            'x':x_pos,
                                            'y':y_pos - 5 - size,
                                            'text':x_val.toFixed(prop['chart.labels.above.decimals']) + ', ' + y_val.toFixed(prop['chart.labels.above.decimals']),
                                            'valign':'center',
                                            'halign':'center',
                                            'bounding':true,
                                            'boundingFill':'rgba(255, 255, 255, 0.7)',
                                            'tag': 'labels.above'
                                            });
                    }
                }
            }
        };




        /**
        * When you click on the chart, this method can return the Y value at that point. It works for any point on the
        * chart (that is inside the gutters) - not just points within the Bars.
        * 
        * @param object e The event object
        */
        this.getYValue =
        this.getValue = function (arg)
        {
            if (arg.length == 2) {
                var mouseX = arg[0];
                var mouseY = arg[1];
            } else {
                var mouseCoords = RG.getMouseXY(arg);
                var mouseX      = mouseCoords[0];
                var mouseY      = mouseCoords[1];
            }
            
            var obj = this;
    
            if (   mouseY < this.gutterTop
                || mouseY > (ca.height - this.gutterBottom)
                || mouseX < this.gutterLeft
                || mouseX > (ca.width - this.gutterRight)
               ) {
                return null;
            }
            
            if (prop['chart.xaxispos'] == 'center') {
                var value = (((this.grapharea / 2) - (mouseY - this.gutterTop)) / this.grapharea) * (this.max - this.min)
                value *= 2;
                
                
                // Account for each side of the X axis
                if (value >= 0) {
                    value += this.min

                    if (prop['chart.ylabels.invert']) {
                        value -= this.min;
                        value = this.max - value;
                    }
                
                } else {

                    value -= this.min;
                    if (prop['chart.ylabels.invert']) {
                        value += this.min;
                        value = this.max + value;
                        value *= -1;
                    }
                }

            } else {

                var value = ((this.grapharea - (mouseY - this.gutterTop)) / this.grapharea) * (this.max - this.min)
                value += this.min;
                
                if (prop['chart.ylabels.invert']) {
                    value -= this.min;
                    value = this.max - value;
                }
            }
    
            return value;
        };




        /**
        * When you click on the chart, this method can return the X value at that point.
        * 
        * @param mixed  arg This can either be an event object or the X coordinate
        * @param number     If specifying the X coord as the first arg then this should be the Y coord
        */
        this.getXValue = function (arg)
        {
            if (arg.length == 2) {
                var mouseX = arg[0];
                var mouseY = arg[1];
            } else {
                var mouseXY = RG.getMouseXY(arg);
                var mouseX  = mouseXY[0];
                var mouseY  = mouseXY[1];
            }
            var obj = this;
            
            if (   mouseY < this.gutterTop
                || mouseY > (ca.height - this.gutterBottom)
                || mouseX < this.gutterLeft
                || mouseX > (ca.width - this.gutterRight)
               ) {
                return null;
            }
    
            var width = (ca.width - this.gutterLeft - this.gutterRight);
            var value = ((mouseX - this.gutterLeft) / width) * (prop['chart.xmax'] - prop['chart.xmin'])
            value += prop['chart.xmin'];

            return value;
        };




        /**
        * Each object type has its own Highlight() function which highlights the appropriate shape
        * 
        * @param object shape The shape to highlight
        */
        this.highlight =
        this.Highlight = function (shape)
        {
            if (typeof prop['chart.highlight.style'] === 'function') {
                (prop['chart.highlight.style'])(shape);
            } else {
                // Boxplot highlight
                if (shape['height']) {
                    RG.Highlight.Rect(this, shape);
        
                // Point highlight
                } else {
                    RG.Highlight.Point(this, shape);
                }
            }
        };




        /**
        * The getObjectByXY() worker method. Don't call this call:
        * 
        * RG.ObjectRegistry.getObjectByXY(e)
        * 
        * @param object e The event object
        */
        this.getObjectByXY = function (e)
        {
            var mouseXY = RG.getMouseXY(e);
    
            if (
                   mouseXY[0] > (this.gutterLeft - 3)
                && mouseXY[0] < (ca.width - this.gutterRight + 3)
                && mouseXY[1] > (this.gutterTop - 3)
                && mouseXY[1] < ((ca.height - this.gutterBottom) + 3)
                ) {
    
                return this;
            }
        };




        /**
        * This function can be used when the canvas is clicked on (or similar - depending on the event)
        * to retrieve the relevant X coordinate for a particular value.
        * 
        * @param int value The value to get the X coordinate for
        */
        this.getXCoord = function (value)
        {
            if (typeof value != 'number' && typeof value != 'string') {
                return null;
            }
            
            // Allow for date strings to be passed
            if (typeof value === 'string') {
                value = RG.parseDate(value);
            }

            var xmin = prop['chart.xmin'];
            var xmax = prop['chart.xmax'];
            var x;
    
            if (value < xmin) return null;
            if (value > xmax) return null;
            
            var gutterRight = this.gutterRight;
            var gutterLeft  = this.gutterLeft;
    
            if (prop['chart.yaxispos'] == 'right') {
                x = ((value - xmin) / (xmax - xmin)) * (ca.width - gutterLeft - gutterRight);
                x = (ca.width - gutterRight - x);
            } else {
                x = ((value - xmin) / (xmax - xmin)) * (ca.width - gutterLeft - gutterRight);
                x = x + gutterLeft;
            }
            
            return x;
        };




        /**
        * This function positions a tooltip when it is displayed
        * 
        * @param obj object    The chart object
        * @param int x         The X coordinate specified for the tooltip
        * @param int y         The Y coordinate specified for the tooltip
        * @param objec tooltip The tooltips DIV element
        *
        this.positionTooltip = function (obj, x, y, tooltip, idx)
        {
            var shape           = RG.Registry.Get('chart.tooltip.shape');
            var dataset         = shape['dataset'];
            var index           = shape['index'];
            var coordX          = obj.coords[dataset][index][0]
            var coordY          = obj.coords[dataset][index][1]
            var canvasXY        = RG.getCanvasXY(obj.canvas);
            var mouseXY         = RG.getMouseXY(window.event);
            var gutterLeft      = obj.gutterLeft;
            var gutterTop       = obj.gutterTop;
            var width           = tooltip.offsetWidth;
            var height          = tooltip.offsetHeight;
            tooltip.style.left  = 0;
            tooltip.style.top   = 0;
    
            // Is the coord a boxplot
            //var isBoxplot = typeof(coordY) == 'object' ? true : false;
    
            // Show any overflow (ie the arrow)
            tooltip.style.overflow = '';
    
            
            // Reposition the tooltip if at the edges:
            
            // LEFT edge //////////////////////////////////////////////////////////////////
            if (canvasXY[0] + mouseXY[0] - (width / 2) < 0) {
                tooltip.style.left = canvasXY[0] + mouseXY[0]  - (width * 0.1) + 'px';
                tooltip.style.top  = window.event.pageY - height - 5 + 'px';
    
            // RIGHT edge //////////////////////////////////////////////////////////////////
            } else if ((canvasXY[0] + (coordX[0] || coordX) + (width / 2)) > doc.body.offsetWidth) {
                tooltip.style.left = canvasXY[0] + mouseXY[0]  - (width * 0.9) + 'px';
                tooltip.style.top  = window.event.pageY - height - 5 + 'px';
    
            // Default positioning - CENTERED //////////////////////////////////////////////////////////////////
            } else {
                tooltip.style.left = canvasXY[0] + mouseXY[0]  - (width / 2) + 'px';
                tooltip.style.top  = window.event.pageY - height - 5 + 'px';
            }
        };*/




        /**
        * Returns the applicable Y COORDINATE when given a Y value
        * 
        * @param int value The value to use
        * @return int The appropriate Y coordinate
        */
        this.getYCoord =
        this.getYCoordFromValue = function (value)
        {
            if (typeof(value) != 'number') {
                return null;
            }
    
            var invert          = prop['chart.ylabels.invert'];
            var xaxispos        = prop['chart.xaxispos'];
            var graphHeight     = ca.height - this.gutterTop - this.gutterBottom;
            var halfGraphHeight = graphHeight / 2;
            var ymax            = this.max;
            var ymin            = prop['chart.ymin'];
            var coord           = 0;
    
            if (value > ymax || (prop['chart.xaxispos'] == 'bottom' && value < ymin) || (prop['chart.xaxispos'] == 'center' && ((value > 0 && value < ymin) || (value < 0 && value > (-1 * ymin))))) {
                return null;
            }
    
            /**
            * This calculates scale values if the X axis is in the center
            */
            if (xaxispos == 'center') {
    
                coord = ((Math.abs(value) - ymin) / (ymax - ymin)) * halfGraphHeight;
    
                if (invert) {
                    coord = halfGraphHeight - coord;
                }
                
                if (value < 0) {
                    coord += this.gutterTop;
                    coord += halfGraphHeight;
                } else {
                    coord  = halfGraphHeight - coord;
                    coord += this.gutterTop;
                }
    
            /**
            * And this calculates scale values when the X axis is at the bottom
            */
            } else {
    
                coord = ((value - ymin) / (ymax - ymin)) * graphHeight;
                
                if (invert) {
                    coord = graphHeight - coord;
                }
    
                // Invert the coordinate because the Y scale starts at the top
                coord = graphHeight - coord;
    
                // And add on the top gutter
                coord = this.gutterTop + coord;
            }
    
            return coord;
        };






        /**
        * A helper class that helps facilitatesbubble charts
        */
        RG.Scatter.Bubble = function (scatter, min, max, width, data)
        {
            this.scatter = scatter;
            this.min     = min;
            this.max     = max;
            this.width   = width;
            this.data    = data;
            this.coords  = [];
            this.type    = 'scatter.bubble'



            /**
            * A setter for the Bubble chart class - it just acts as a "passthru" to the Scatter object
            */
            this.set =
            this.Set = function (name, value)
            {
                this.scatter.set(name, value);
                
                return this;
            };



            /**
            * A getter for the Bubble chart class - it just acts as a "passthru" to the Scatter object
            */
            this.get =
            this.Get = function (name)
            {
                this.scatter.get(name);
            };




            /**
            * Tha Bubble chart draw function
            */
            this.draw =
            this.Draw = function ()
            {
                var bubble_min       = this.min,
                    bubble_max       = this.max,
                    bubble_data      = this.data,
                    bubble_max_width = this.width;
        
                // Keep a record of the bubble chart object
                var obj_bubble  = this,
                    obj_scatter = this.scatter;

                // This custom ondraw event listener draws the bubbles
                this.scatter.ondraw = function (obj)
                {
                    // Loop through all the points (first dataset)
                    for (var i=0; i<obj.coords[0].length; ++i) {
                        
                        bubble_data[i] = ma.max(bubble_data[i], bubble_min);
                        bubble_data[i] = ma.min(bubble_data[i], bubble_max);
        
                        var     r = ((bubble_data[i] - bubble_min) / (bubble_max - bubble_min) ) * bubble_max_width,
                            color = obj_scatter.data[0][i][2] ? obj_scatter.data[0][i][2] : obj_scatter.properties['chart.defaultcolor'];
        
                        co.beginPath();
                        co.fillStyle = RG.radialGradient(obj,
                            obj_scatter.coords[0][i][0] + (r / 2.5),
                            obj_scatter.coords[0][i][1] - (r / 2.5),
                            0,
                            obj_scatter.coords[0][i][0] + (r / 2.5),
                            obj_scatter.coords[0][i][1] - (r / 2.5),
                            r,
                            prop['chart.colors.bubble.graduated'] ? 'white' : color,
                            color
                        );
                        
                        // Draw the bubble
                        co.arc(
                            obj_scatter.coords[0][i][0],
                            obj_scatter.coords[0][i][1],
                            r,
                            0,
                            RG.TWOPI,
                            false
                        );

                        co.fill();

                        obj_bubble.coords[i] = [
                            obj_scatter.coords[0][i][0],
                            obj_scatter.coords[0][i][1],
                            r,
                            co.fillStyle
                        ];
                    }
                }
                
                this.scatter.Draw();
                
                return this;
            };
        };





        /**
        * This allows for easy specification of gradients
        */
        this.parseColors = function ()
        {
            // Save the original colors so that they can be restored when the canvas is reset
            if (this.original_colors.length === 0) {
                this.original_colors['data']                        = RG.array_clone(this.data);
                this.original_colors['chart.background.vbars']      = RG.array_clone(prop['chart.background.vbars']);
                this.original_colors['chart.background.hbars']      = RG.array_clone(prop['chart.background.hbars']);
                this.original_colors['chart.line.colors']           = RG.array_clone(prop['chart.line.colors']);
                this.original_colors['chart.defaultcolor']          = RG.array_clone(prop['chart.defaultcolor']);
                this.original_colors['chart.crosshairs.color']      = RG.array_clone(prop['chart.crosshairs.color']);
                this.original_colors['chart.highlight.stroke']      = RG.array_clone(prop['chart.highlight.stroke']);
                this.original_colors['chart.highlight.fill']        = RG.array_clone(prop['chart.highlight.fill']);
                this.original_colors['chart.background.barcolor1']  = RG.array_clone(prop['chart.background.barcolor1']);
                this.original_colors['chart.background.barcolor2']  = RG.array_clone(prop['chart.background.barcolor2']);
                this.original_colors['chart.background.grid.color'] = RG.array_clone(prop['chart.background.grid.color']);
                this.original_colors['chart.background.color']      = RG.array_clone(prop['chart.background.color']);
                this.original_colors['chart.axis.color']            = RG.array_clone(prop['chart.axis.color']);
            }





            // Colors
            var data = this.data;
            if (data) {
                for (var dataset=0; dataset<data.length; ++dataset) {
                    for (var i=0; i<this.data[dataset].length; ++i) {

                        // Boxplots
                        if (this.data[dataset][i] && typeof(this.data[dataset][i][1]) == 'object' && this.data[dataset][i][1]) {
    
                            if (typeof(this.data[dataset][i][1][5]) == 'string') this.data[dataset][i][1][5] = this.parseSingleColorForGradient(this.data[dataset][i][1][5]);
                            if (typeof(this.data[dataset][i][1][6]) == 'string') this.data[dataset][i][1][6] = this.parseSingleColorForGradient(this.data[dataset][i][1][6]);
                        }
                        
                        if (!RG.isNull(this.data[dataset][i])) {
                            this.data[dataset][i][2] = this.parseSingleColorForGradient(this.data[dataset][i][2]);
                        }
                    }
                }
            }
            
            // Parse HBars
            var hbars = prop['chart.background.hbars'];
            if (hbars) {
                for (i=0; i<hbars.length; ++i) {
                    hbars[i][2] = this.parseSingleColorForGradient(hbars[i][2]);
                }
            }
            
            // Parse HBars
            var vbars = prop['chart.background.vbars'];
            if (vbars) {
                for (i=0; i<vbars.length; ++i) {
                    vbars[i][2] = this.parseSingleColorForGradient(vbars[i][2]);
                }
            }
            
            // Parse line colors
            var colors = prop['chart.line.colors'];
            if (colors) {
                for (i=0; i<colors.length; ++i) {
                    colors[i] = this.parseSingleColorForGradient(colors[i]);
                }
            }
    
             prop['chart.defaultcolor']          = this.parseSingleColorForGradient(prop['chart.defaultcolor']);
             prop['chart.crosshairs.color']      = this.parseSingleColorForGradient(prop['chart.crosshairs.color']);
             prop['chart.highlight.stroke']      = this.parseSingleColorForGradient(prop['chart.highlight.stroke']);
             prop['chart.highlight.fill']        = this.parseSingleColorForGradient(prop['chart.highlight.fill']);
             prop['chart.background.barcolor1']  = this.parseSingleColorForGradient(prop['chart.background.barcolor1']);
             prop['chart.background.barcolor2']  = this.parseSingleColorForGradient(prop['chart.background.barcolor2']);
             prop['chart.background.grid.color'] = this.parseSingleColorForGradient(prop['chart.background.grid.color']);
             prop['chart.background.color']      = this.parseSingleColorForGradient(prop['chart.background.color']);
             prop['chart.axis.color']            = this.parseSingleColorForGradient(prop['chart.axis.color']);
        };




        /**
        * Use this function to reset the object to the post-constructor state. Eg reset colors if
        * need be etc
        */
        this.reset = function ()
        {
        };




        /**
        * This parses a single color value for a gradient
        */
        this.parseSingleColorForGradient = function (color)
        {
            if (!color || typeof(color) != 'string') {
                return color;
            }
    
            if (color.match(/^gradient\((.*)\)$/i)) {
                
                var parts = RegExp.$1.split(':');
    
                // Create the gradient
                var grad = co.createLinearGradient(0,ca.height - prop['chart.gutter.bottom'], 0, prop['chart.gutter.top']);
    
                var diff = 1 / (parts.length - 1);
    
                grad.addColorStop(0, RG.trim(parts[0]));
    
                for (var j=1; j<parts.length; ++j) {
                    grad.addColorStop(j * diff, RG.trim(parts[j]));
                }
            }
                
            return grad ? grad : color;
        };




        /**
        * This function handles highlighting an entire data-series for the interactive
        * key
        * 
        * @param int index The index of the data series to be highlighted
        */
        this.interactiveKeyHighlight = function (index)
        {
            if (this.coords && this.coords[index] && this.coords[index].length) {
                this.coords[index].forEach(function (value, idx, arr)
                {
                    co.beginPath();
                    co.fillStyle = prop['chart.key.interactive.highlight.chart.fill'];
                    co.arc(value[0], value[1], prop['chart.ticksize'] + 3, 0, RG.TWOPI, false);
                    co.fill();
                });
            }
        };




        /**
        * Using a function to add events makes it easier to facilitate method chaining
        * 
        * @param string   type The type of even to add
        * @param function func 
        */
        this.on = function (type, func)
        {
            if (type.substr(0,2) !== 'on') {
                type = 'on' + type;
            }
            
            if (typeof this[type] !== 'function') {
                this[type] = func;
            } else {
                RG.addCustomEventListener(this, type, func);
            }
    
            return this;
        };




        /**
        * This function runs once only
        * (put at the end of the file (before any effects))
        */
        this.firstDrawFunc = function ()
        {
        };




        /**
        * Trace2
        * 
        * This is a new version of the Trace effect which no longer requires jQuery and is more compatible
        * with other effects (eg Expand). This new effect is considerably simpler and less code.
        * 
        * @param object     Options for the effect. Currently only "frames" is available.
        * @param int        A function that is called when the ffect is complete
        */
        this.trace  =
        this.trace2 = function ()
        {
            var obj       = this,
                callback  = arguments[2],
                opt       = arguments[0] || {},
                frames    = opt.frames || 30,
                frame     = 0,
                callback  = arguments[1] || function () {}

            obj.Set('animationTrace', true);
            obj.Set('animationTraceClip', 0);
    
            function iterator ()
            {
                RG.clear(obj.canvas);

                RG.redrawCanvas(obj.canvas);

                if (frame++ < frames) {
                    obj.set('animationTraceClip', frame / frames);
                    RG.Effects.updateCanvas(iterator);
                } else {
                    callback(obj);
                }
            }
            
            iterator();
            
            return this;
        };




        /**
        * This helps the Gantt reset colors when the reset function is called.
        * It handles going through the data and resetting the colors.
        */
        this.resetColorsToOriginalValues = function ()
        {
            /**
            * Copy the original colors over for single-event-per-line data
            */
            for (var i=0,len=this.original_colors['data'].length; i<len; ++i) {
                for (var j=0,len2=this.original_colors['data'][i].length; j<len2;++j) {
                    
                    // The color for the point
                    this.data[i][j][2] = RG.array_clone(this.original_colors['data'][i][j][2]);
                    
                    // Handle boxplots
                    if (typeof this.data[i][j][1] === 'object') {
                        this.data[i][j][1][5] = RG.array_clone(this.original_colors['data'][i][j][1][5]);
                        this.data[i][j][1][6] = RG.array_clone(this.original_colors['data'][i][j][1][6]);
                    }
                }
            }
        };




        /**
        * Register the object
        */
        RG.register(this);




        /**
        * This is the 'end' of the constructor so if the first argument
        * contains configuration data - handle that.
        */
        if (parseConfObjectForOptions) {
            RG.parseObjectStyleConfig(this, conf.options);
        }
    };