import {Decorator} from '@monument/reflection/main/Decorator';
import {Class} from '@monument/reflection/main/Class';
import {Method} from '@monument/reflection/main/Method';
import {Test} from './Test';


export class TestDecorator extends Decorator {

    protected onMethod(klass: Class<any>, method: Method): void {
        method.decorate(Test);
    }
}