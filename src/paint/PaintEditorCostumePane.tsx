import * as React from 'react';
import _ from "lodash";
import * as project from '../Project';
import ToolSelectComponent from './ui/ToolSelectButton';
import List from './ui/list/list';
import ListItem from './ui/list/list-item';
import { IPaintEditor } from './PaintEditor';

export interface IPaintEditorCostumePaneProps {
  sprite: project.SpriteDef;
}

export interface IPaintEditorCostumePaneState {
  sprite: project.SpriteDef;
  selectedCostumeIndex: number | null;
  /**
   * selected costume
   */
  costume: project.CostumeDef;

  /**
   * fake property for updating list
   */
  version: number
}

export default class PaintEditorCostumePane extends React.Component<IPaintEditorCostumePaneProps, IPaintEditorCostumePaneState> {
  constructor(props: IPaintEditorCostumePaneProps) {
    super(props);

    _.bindAll(this, [
      'onCostumeSelected',
      'onCostumeChange',
      'renderItem'
    ]);

    this.state = {
      sprite: props.sprite,
      selectedCostumeIndex: 0,
      costume: props.sprite.costumes[0],
      version: 0
    }
  }

  componentDidMount() {
    this.state.sprite.onCostumeChange.add(this.onCostumeChange);
  }

  componentWillUnmount() {
    this.state.sprite.onCostumeChange.remove(this.onCostumeChange);
  }

  componentWillReceiveProps(newProps) {
  }

  /**
   * called when image on any costume changes
   */
  private onCostumeChange(costume: project.CostumeDef) {
    this.setState({ version: this.state.version + 1 })
  }

  public render() {
    return (
      <div className='PaintEditor-costume'>
        <List
          itemCount={this.state.sprite.costumes.length}
          render={(index) => this.renderItem(index)}
          selectedItem={this.state.selectedCostumeIndex}
          onChange={this.onCostumeSelected} />
      </div >
    );
  }

  private onCostumeSelected(index: number | null) {
    this.setState({ selectedCostumeIndex: index })
  }

  renderItem(idx: number): { item: React.ReactNode, key: string } | undefined {
    if (idx >= this.state.sprite.costumes.length) {
      return undefined;
    }
    let costume = this.state.sprite.costumes[idx];

    return {
      item: (
        <div className="contact">
          <img src={costume.imageData?.image} />
          <span className="name">{costume.name}</span>
        </div>
      ),
      key: costume.id
    };
  }
}
