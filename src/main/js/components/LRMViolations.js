/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
 */
import React from 'react';
import '../style.css';
import {translate} from '../common/l10n.js'

export default class LRMViolations extends React.PureComponent {

  render() {
    var distri = this.props.measure.distribution.split(";")
    var ch = "";
    var chl = "";
    for(let d = 0; d < distri.length; d++){
      var char_d = distri[d]
       ch = ch + char_d.substring(char_d.length-1,char_d.length);
       ch = ch +",";
       chl = chl + char_d.substring(0,char_d.length-2);
       chl = chl +"|";
  }

    var chart = ch.substring(0,ch.length-1) + "&chl="  +chl.substring(0,chl.length-1);
    var proj = '/project/issues?id=' +this.props.measure.project+ '&resolved=false&tags=lrm-base,lrm-target'
    chart = 'https://chart.googleapis.com/chart?chs=400x160&chco=7AAF00&cht=p3&chd=t:' +chart

    return (

      <table className="lg_ds_progress_bar" border="0" width="500">
      <h3>{translate('lingoport.sourceissues')}</h3>

      <tbody>
      <p>
       <span className="big"><a href={proj}>
       <span id="m_lngprt-gyzr-violations">{this.props.measure.violation}</span> </a></span>
      </p>
      <span><span id="m_lngprt-gyzr-violations-rci" class="alert_OK">{this.props.measure.rci}%</span> {translate('lingoport.compliance')}</span>
      <br/>
      <span>{this.props.measure.ratio} {translate('lingoport.ruleactive')}</span>
      <br/>
      </tbody></table>

    );
  }
}
