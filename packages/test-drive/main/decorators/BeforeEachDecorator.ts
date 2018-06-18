import {BeforeEach} from './BeforeEach';
import {Decorator} from '@monument/core/main/reflection/Decorator';
import {Class} from '@monument/core/main/reflection/Class';
import {Method} from '@monument/core/main/reflection/Method';


export class BeforeEachDecorator extends Decorator {

    protected onMethod(klass: Class<any>, method: Method): void {
        method.decorate(BeforeEach);
    }
}
