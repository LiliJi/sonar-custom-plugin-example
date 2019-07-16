/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com
 */
import React from 'react';
import '../style.css';


export default class LRMCompletion extends React.PureComponent {

  render() {
    var totalfiles = 0;
    var totalwords = 0;
    var totalkeys =0;
    var totalpercent = 0;
    if(this.props.measure.ids === undefined){
       var content = "";
    }
    else{
      var ids = this.props.measure.ids.split(";")
      var display = this.props.measure.display.split(";")
      var tfiles = this.props.measure.tfiles.split(";")
      var tkeys = this.props.measure.tkeys.split(";")
      var twords = this.props.measure.twords.split(";")
      var percent = this.props.measure.percent.split(";")
      var content = new Array(ids.length);

      for(let d = 0; d < ids.length; d++){
        var p = percent[d] +"%";
        totalfiles = Number(tfiles[d]) + Number(totalfiles);
        totalwords = Number(twords[d])+ Number(totalwords);
        totalkeys = Number(tkeys[d])+ Number(totalkeys);
        totalpercent = Number(percent[d])+ Number(totalpercent);
        content[d]  = (
         <tr>
         <td title={display[d]}>{ids[d]}</td>

         <div style={{width: '100%', height: '17px', backgroundColor: '#DDDDDD'}}>
         <div style={{width:p, height:'11px',lineHeight:'11px',backgroundColor: '#BBBBBB',borderTop:'3px solid #DDDDDD',color:'#4F7007',fontSize:'12px'}}>{percent[d]}%</div>
         </div>

         <td>{tfiles[d].substring(0,tfiles[d].length-2)}</td>
         <td>{tkeys[d].substring(0,tkeys[d].length-2)}</td>
         <td>{twords[d].substring(0,twords[d].length-2)}</td>
         </tr>
      );
    }
    var tpercent = Number(totalpercent)/ids.length +"%";
  }

    return (
      <div className="widget">
      <table>
      <h3>Resource Manager Completion Report</h3>

      <tbody>
      <tr>
      <td>
      Base Resource Files: <span>{this.props.measure.files}</span> <br/>
      Base Resource Keys: <span>{this.props.measure.keys}</span> <br/>
      Base Resource Words: <span>{this.props.measure.words}</span> <br/>

      </td>
      <td valign="top" align="left" nowrap="">
            Last Sent Kit:  {this.props.measure.versionnum} <br/>
            Default Locale: {this.props.measure.d_local} <br/>
      </td>
      </tr>
      </tbody></table>

      <table className="lg_ds_progress_bar" border="0" width="500">
        <thead>
          <tr>
            <th>Locale</th><th>Percent Complete</th><th>Files<br/>Remaining </th><th>Keys<br/>Remaining </th><th>Words<br/>Remaining </th>
         </tr>
        </thead>
        <tbody>{content}
        <tr>
            <th>Totals</th>
            <th className="bar" valign="middle" nowrap="">
              <div style={{width: '100%', height: '17px', backgroundColor: '#DDDDDD'}}>
              <div style={{width:tpercent, height:'11px',lineHeight:'11px',backgroundColor: '#BBBBBB',borderTop:'3px solid #DDDDDD',color:'#4F7007',fontSize:'12px'}}>{tpercent}</div>

            </div></th>
            <th>{totalfiles}</th><th>{totalkeys}</th><th>{totalwords}</th>
         </tr>

        </tbody></table>
        </div>
    );
  }
}
