/**
 * Shared
 *
 * Holds the Trees used by all the components
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2025-03-11
 */

// Ouroboros imports
import { Tree } from '@ouroboros/define';

// Mouth definition files
import TemplateEmailDef from '@ouroboros/mouth/define/template_email.json';
import TemplateSMSDef from '@ouroboros/mouth/define/template_sms.json';

// Generate the email Tree
export const EmailTree = new Tree(TemplateEmailDef, {
	__name__: 'record',
	text: { __ui__: { __title__: 'Plain Text', __type__: 'textarea' } },
	html: { __ui__: { __title__: 'Raw HTML', __type__: 'textarea' } }
});

// Generate the sms Tree
export const SmsTree = new Tree(TemplateSMSDef, {
	__name__: 'record',
	content: { __ui__: { __title__: 'Content', __type__: 'textarea' } }
});