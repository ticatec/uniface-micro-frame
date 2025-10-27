import type {Indicator} from "@ticatec/uniface-element/indicator";
import type {Toast} from "@ticatec/uniface-element/toast";
import type {IMessageBox} from "@ticatec/uniface-element/message-box";
import type {IDialog} from "@ticatec/uniface-element/dialog";

interface Window {
    Indicator: Indicator;
    Toast: Toast;
    MessageBox: IMessageBox;
    Dialog: IDialog;
}
