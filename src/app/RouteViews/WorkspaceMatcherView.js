'use strict';

module.exports = Ember.View.extend({

    tagName: 'div',

    classNames: [
        'main-container__match-grid'
    ],

    hover: null,

    isTraced: function(){
        if (this.get('hover') === null) {
            return false;
        }
        else {
            return !this.get('hover.isDiag');
        }
    }.property('hover'),

    NodeView: Ember.View.extend({

        tagName: 'div',

        from: null,

        to: null,

        mouseEnter: function(){
            this.get('parentView').set('hover', this);
        },

        click: function(){
            this.get('controller').transitionToRoute('matcher.pair', { from: this.get('from'), to: this.get('to') });
        },

        isHorizontal: function(){
            return this.get('parentView.isTraced') && this.get('parentView.hover.indexY') === this.get('indexY') && this.get('parentView.hover.indexX') > this.get('indexX');
        }.property('parentView.hover'),

        isVertical: function(){
            return this.get('parentView.isTraced') && this.get('parentView.hover.indexX') === this.get('indexX') && this.get('parentView.hover.indexY') > this.get('indexY');
        }.property('parentView.hover'),

        isFinished: function(){
            return !this.get('isDiag') && this.get('controller.finished').indexOf(this.get('key')) !== -1;
        }.property('controller.finished.length', 'key'),

        isDiag: function(){
            return this.get('viewX') === this.get('viewY');
        }.property(),

        isInprogress: function(){
            if (this.get('controller.scheduler')) {
                return this.get('controller.scheduler.inProgress').indexOf(this.get('key')) !== -1;
            }
            else {
                return false;
            }
        }.property('controller.scheduler.inProgress.length')

    })

});